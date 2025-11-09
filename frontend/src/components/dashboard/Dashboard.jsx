import { useState, useEffect } from "react";
import TaskManager from "./TaskManager";
import TaskStats from "./TaskStats";
import { taskService } from "../../services/taskService";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  const fetchStats = async () => {
    try {
      const response = await taskService.getTaskStats();
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleTaskChange = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your tasks efficiently</p>
      </div>

      {stats && <TaskStats stats={stats} />}

      <TaskManager onTaskChange={handleTaskChange} />
    </div>
  );
};

export default Dashboard;
