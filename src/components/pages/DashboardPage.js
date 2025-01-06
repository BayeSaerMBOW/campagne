import React from "react";
import { Card, CardContent } from "../../components/ui/card.js"; // Chemin relatif corrigé

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Users, Target, Award } from "lucide-react";

const DashboardPage = () => {
  const campaignData = [
    { month: "Jan", clients: 4000, engagement: 2400, conversion: 2400 },
    { month: "Fév", clients: 3000, engagement: 1398, conversion: 2210 },
    { month: "Mar", clients: 2000, engagement: 9800, conversion: 2290 },
    { month: "Avr", clients: 2780, engagement: 3908, conversion: 2000 },
    { month: "Mai", clients: 1890, engagement: 4800, conversion: 2181 },
    { month: "Juin", clients: 2390, engagement: 3800, conversion: 2500 },
  ];

  const rewardTypeData = [
    { name: "Cashback", value: 33, color: "#FF8042" },
    { name: "Points", value: 25, color: "#00C49F" },
    { name: "Discount", value: 25, color: "#FFBB28" },
    { name: "Voucher", value: 17, color: "#0088FE" },
  ];

  const channelData = [
    { channel: "Email", campaigns: 40, success: 85 },
    { channel: "SMS", campaigns: 30, success: 75 },
    { channel: "Social", campaigns: 20, success: 90 },
    { channel: "Push", campaigns: 10, success: 65 },
  ];

  const stats = [
    {
      title: "Campagnes Actives",
      value: "24",
      change: "+12%",
      icon: <TrendingUp className="h-6 w-6 text-orange-500" />,
    },
    {
      title: "Clients Engagés",
      value: "12.5K",
      change: "+8%",
      icon: <Users className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Taux de Conversion",
      value: "18.2%",
      change: "+5%",
      icon: <Target className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Récompenses Distribuées",
      value: "8.4K",
      change: "+15%",
      icon: <Award className="h-6 w-6 text-purple-500" />,
    },
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Tableau de Bord des Campagnes
        </h1>
        <select className="p-2 bg-white border rounded-lg text-sm">
          <option value="30">30 derniers jours</option>
          <option value="90">90 derniers jours</option>
          <option value="365">Cette année</option>
        </select>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <span className="text-sm font-medium text-green-500">
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance des Campagnes */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">
              Performance des Campagnes
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="clients"
                    stroke="#FF8042"
                    name="Clients"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="#00C49F"
                    name="Engagement"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="conversion"
                    stroke="#FFBB28"
                    name="Conversion"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribution des Récompenses */}
        <Card className="bg-white">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">
              Distribution des Récompenses
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rewardTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {rewardTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend formatter={(value, entry) => `${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
