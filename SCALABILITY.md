# 📈 Scalability & Architecture Notes

## Overview

This document outlines the scalability considerations, architecture patterns, and recommendations for scaling the Backend Developer Assignment application.

## Current Architecture

### Single Server Architecture

```
┌──────────────────────────────────────────────────┐
│                   Client                         │
│              (React Frontend)                    │
└─────────────────┬────────────────────────────────┘
                  │
                  │ HTTP/HTTPS
                  ▼
┌──────────────────────────────────────────────────┐
│              Express.js Server                   │
│  ┌────────────────────────────────────────────┐  │
│  │   Rate Limiting │ CORS │ Helmet           │  │
│  └────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────┐  │
│  │   Authentication Middleware (JWT)         │  │
│  └────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────┐  │
│  │   Business Logic (Controllers)            │  │
│  └────────────────────────────────────────────┘  │
└─────────────────┬────────────────────────────────┘
                  │
                  │ Mongoose ODM
                  ▼
┌──────────────────────────────────────────────────┐
│              MongoDB Database                    │
│  ┌────────────────┐  ┌─────────────────────┐    │
│  │  Users         │  │  Tasks              │    │
│  │  Collection    │  │  Collection         │    │
│  └────────────────┘  └─────────────────────┘    │
└──────────────────────────────────────────────────┘
```

## Scalability Considerations

### 1. Horizontal Scaling (Scale Out)

#### Load Balancer Architecture

```
┌─────────────────┐
│   Client        │
└────────┬────────┘
         │
    ┌────▼────┐
    │  Nginx  │
    │ (Load   │
    │ Balancer)│
    └────┬────┘
         │
    ┌────┴─────┬─────────┬─────────┐
    │          │         │         │
┌───▼───┐  ┌──▼───┐  ┌──▼───┐  ┌──▼───┐
│Server1│  │Server2│  │Server3│  │ServerN│
│:5000  │  │:5001 │  │:5002 │  │:500N │
└───┬───┘  └──┬───┘  └──┬───┘  └──┬───┘
    │         │         │         │
    └────┬────┴────┬────┴─────────┘
         │         │
    ┌────▼─────────▼────┐
    │   MongoDB Cluster  │
    │   (Replica Set)    │
    └───────────────────┘
```

#### Implementation Steps

1. **Setup Nginx Load Balancer**

```nginx
upstream backend_servers {
    least_conn;
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

2. **Session Management with Redis**

```javascript
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redis = require("redis");

const redisClient = redis.createClient({
  host: "redis-server",
  port: 6379,
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
```

### 2. Database Scaling

#### MongoDB Replica Set

```
┌─────────────────────────────────────────┐
│         MongoDB Replica Set             │
│                                         │
│  ┌───────────┐    ┌───────────┐        │
│  │  Primary  │───▶│ Secondary │        │
│  │   Node    │    │   Node 1  │        │
│  └─────┬─────┘    └───────────┘        │
│        │                                │
│        │          ┌───────────┐        │
│        └─────────▶│ Secondary │        │
│                   │   Node 2  │        │
│                   └───────────┘        │
└─────────────────────────────────────────┘
```

**Benefits:**

- High availability
- Read scaling (read from secondaries)
- Automatic failover

#### Implementation

```javascript
// Update MongoDB connection string
const mongoUri =
  "mongodb://node1,node2,node3/backend_assignment?replicaSet=rs0";

mongoose.connect(mongoUri, {
  readPreference: "secondaryPreferred", // Read from secondary when possible
});
```

#### Database Sharding

```
┌─────────────────────────────────────────┐
│          Shard Distribution             │
│                                         │
│  Shard 1        Shard 2       Shard 3  │
│  ┌────────┐    ┌────────┐    ┌────────┐│
│  │Users   │    │Users   │    │Users   ││
│  │A-F     │    │G-M     │    │N-Z     ││
│  └────────┘    └────────┘    └────────┘│
│                                         │
│  ┌────────┐    ┌────────┐    ┌────────┐│
│  │Tasks   │    │Tasks   │    │Tasks   ││
│  │0-1000  │    │1001-   │    │2001-   ││
│  │        │    │2000    │    │3000    ││
│  └────────┘    └────────┘    └────────┘│
└─────────────────────────────────────────┘
```

### 3. Caching Strategy

#### Multi-Layer Caching

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
     ▼
┌────────────────┐
│  CDN Cache     │ ← Static Assets
└────┬───────────┘
     │
     ▼
┌────────────────┐
│ Redis Cache    │ ← API Responses, Sessions
└────┬───────────┘
     │
     ▼
┌────────────────┐
│  MongoDB       │ ← Persistent Data
└────────────────┘
```

#### Implementation

**Redis Caching**

```javascript
const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379,
});

// Cache middleware
const cache = (duration) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;

    try {
      const cachedData = await client.get(key);
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
    } catch (err) {
      console.error("Cache error:", err);
    }

    res.sendResponse = res.json;
    res.json = (body) => {
      client.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    next();
  };
};

// Use in routes
router.get("/tasks", cache(300), getTasks); // Cache for 5 minutes
```

**Cache Invalidation**

```javascript
// Invalidate cache on updates
exports.updateTask = async (req, res) => {
  // Update task
  const task = await Task.findByIdAndUpdate(req.params.id, req.body);

  // Invalidate related cache
  await client.del(`cache:/api/v1/tasks`);
  await client.del(`cache:/api/v1/tasks/${req.params.id}`);

  res.json({ success: true, data: task });
};
```

### 4. Microservices Architecture

#### Service Decomposition

```
┌──────────────────────────────────────────────────┐
│              API Gateway (Nginx)                 │
│              Port 80/443                         │
└─────────┬────────────────────┬───────────────────┘
          │                    │
    ┌─────▼──────┐      ┌─────▼──────┐
    │   Auth     │      │   Task     │
    │  Service   │      │  Service   │
    │  :5001     │      │  :5002     │
    └─────┬──────┘      └─────┬──────┘
          │                    │
    ┌─────▼──────┐      ┌─────▼──────┐
    │   Users    │      │   Tasks    │
    │   MongoDB  │      │   MongoDB  │
    └────────────┘      └────────────┘
```

**Benefits:**

- Independent scaling
- Technology flexibility
- Fault isolation
- Easier deployment

#### Implementation with Docker Compose

```yaml
version: "3.8"

services:
  api-gateway:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf

  auth-service:
    build: ./services/auth
    environment:
      - DB_URI=mongodb://auth-db:27017/auth
    depends_on:
      - auth-db

  task-service:
    build: ./services/task
    environment:
      - DB_URI=mongodb://task-db:27017/tasks
    depends_on:
      - task-db

  auth-db:
    image: mongo:7.0
    volumes:
      - auth-data:/data/db

  task-db:
    image: mongo:7.0
    volumes:
      - task-data:/data/db
```

### 5. Message Queue Architecture

#### Async Processing with RabbitMQ

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│  API     │  Publish│ RabbitMQ │ Consume │  Worker  │
│  Server  │────────▶│  Queue   │────────▶│  Service │
└──────────┘         └──────────┘         └──────────┘
                                                │
                                                ▼
                                          ┌──────────┐
                                          │  Email   │
                                          │  Service │
                                          └──────────┘
```

**Use Cases:**

- Email notifications
- Report generation
- Data export
- Background tasks

**Implementation**

```javascript
const amqp = require("amqplib");

// Publisher
const publishTask = async (taskData) => {
  const connection = await amqp.connect("amqp://rabbitmq");
  const channel = await connection.createChannel();
  const queue = "task_notifications";

  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(taskData)));

  await channel.close();
  await connection.close();
};

// Consumer (Worker Service)
const consumeTasks = async () => {
  const connection = await amqp.connect("amqp://rabbitmq");
  const channel = await connection.createChannel();
  const queue = "task_notifications";

  await channel.assertQueue(queue);
  channel.consume(queue, async (msg) => {
    const taskData = JSON.parse(msg.content.toString());
    await sendEmailNotification(taskData);
    channel.ack(msg);
  });
};
```

### 6. CDN Integration

#### Static Asset Distribution

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  User    │────▶│   CDN    │────▶│  Origin  │
│  Browser │     │ (Cached) │     │  Server  │
└──────────┘     └──────────┘     └──────────┘
```

**Benefits:**

- Reduced latency
- Lower bandwidth costs
- Better user experience
- DDoS protection

**Recommended CDNs:**

- Cloudflare
- AWS CloudFront
- Fastly
- Akamai

### 7. Performance Optimization

#### API Response Time Optimization

1. **Database Indexing**

```javascript
// Task model with indexes
taskSchema.index({ createdBy: 1, status: 1 });
taskSchema.index({ createdBy: 1, priority: 1 });
taskSchema.index({ createdAt: -1 });
```

2. **Query Optimization**

```javascript
// Bad: Multiple queries
const tasks = await Task.find({ createdBy: userId });
for (let task of tasks) {
  task.user = await User.findById(task.createdBy);
}

// Good: Single query with populate
const tasks = await Task.find({ createdBy: userId })
  .populate("createdBy", "name email")
  .lean(); // Convert to plain JavaScript objects
```

3. **Pagination Implementation**

```javascript
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const tasks = await Task.find(query)
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit)
  .lean();
```

4. **Compression**

```javascript
const compression = require("compression");
app.use(compression());
```

### 8. Monitoring & Logging

#### Application Performance Monitoring

```
┌──────────────────────────────────────┐
│        APM Dashboard                 │
│  ┌────────────┐  ┌────────────┐     │
│  │  Response  │  │   Error    │     │
│  │   Times    │  │   Rates    │     │
│  └────────────┘  └────────────┘     │
│  ┌────────────┐  ┌────────────┐     │
│  │  CPU/Mem   │  │   Uptime   │     │
│  │   Usage    │  │            │     │
│  └────────────┘  └────────────┘     │
└──────────────────────────────────────┘
```

**Recommended Tools:**

- **APM**: New Relic, DataDog, Dynatrace
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Error Tracking**: Sentry, Rollbar
- **Uptime Monitoring**: Pingdom, UptimeRobot

**Implementation**

```javascript
// APM Integration (New Relic)
require("newrelic");

// Error tracking (Sentry)
const Sentry = require("@sentry/node");
Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(Sentry.Handlers.errorHandler());
```

### 9. Security at Scale

1. **API Rate Limiting per User**

```javascript
const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");

const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
  }),
  windowMs: 15 * 60 * 1000,
  max: async (req) => {
    // Admin users get higher limits
    return req.user?.role === "admin" ? 1000 : 100;
  },
  keyGenerator: (req) => req.user?.id || req.ip,
});
```

2. **DDoS Protection**

- Use Cloudflare
- Implement rate limiting
- Enable CAPTCHA for suspicious traffic

3. **Database Connection Pooling**

```javascript
mongoose.connect(mongoUri, {
  maxPoolSize: 50,
  minPoolSize: 10,
  socketTimeoutMS: 45000,
});
```

### 10. Cost Optimization

#### Resource Utilization

```
┌─────────────────────────────────────┐
│     Auto-Scaling Configuration      │
│                                     │
│  Min Instances: 2                   │
│  Max Instances: 10                  │
│  Target CPU: 70%                    │
│  Scale Up: +2 instances             │
│  Scale Down: -1 instance            │
└─────────────────────────────────────┘
```

**Cloud Provider Recommendations:**

- **AWS**: EC2 Auto Scaling, RDS, ElastiCache
- **Google Cloud**: Compute Engine, Cloud SQL, Memorystore
- **Azure**: Virtual Machines, Azure Database, Redis Cache

## Recommended Architecture for Production

```
                         ┌──────────────┐
                         │  Cloudflare  │
                         │   (CDN/DDoS) │
                         └──────┬───────┘
                                │
                         ┌──────▼───────┐
                         │   AWS ALB    │
                         │ Load Balancer│
                         └──────┬───────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
        ┌─────▼────┐      ┌────▼─────┐     ┌────▼─────┐
        │ Server 1 │      │ Server 2 │     │ Server N │
        │  (EC2)   │      │  (EC2)   │     │  (EC2)   │
        └─────┬────┘      └────┬─────┘     └────┬─────┘
              │                │                │
              └────────┬───────┴────────────────┘
                       │
           ┌───────────┼───────────┐
           │           │           │
      ┌────▼────┐ ┌───▼────┐ ┌───▼────┐
      │ MongoDB │ │ Redis  │ │RabbitMQ│
      │ Cluster │ │ Cache  │ │ Queue  │
      └─────────┘ └────────┘ └────────┘
```

## Performance Benchmarks

### Target Metrics

- **Response Time**: < 200ms (p95)
- **Throughput**: 1000+ requests/second
- **Availability**: 99.9% uptime
- **Error Rate**: < 0.1%

### Load Testing

```bash
# Using Apache Bench
ab -n 10000 -c 100 http://localhost:5000/api/v1/tasks

# Using Artillery
artillery quick --count 100 --num 1000 http://localhost:5000/api/v1/tasks
```

## Conclusion

This scalability architecture provides:

- **High Availability**: Multiple servers, database replication
- **Performance**: Caching, CDN, load balancing
- **Resilience**: Error handling, monitoring, auto-scaling
- **Cost Efficiency**: Resource optimization, auto-scaling

The implementation can be done incrementally, starting with the most impactful changes (caching, indexing) and progressing to more complex architectures (microservices, sharding) as the application grows.
