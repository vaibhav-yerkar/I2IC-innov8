import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; // Changed from Line to Bar
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  LinearProgress,
  Paper,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement, // Changed from LineElement
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // Changed from LineElement
  Title,
  Tooltip,
  Legend
);

interface AnalyticsData {
  eventInfo: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    createdOn: string;
  };
  participantsAnalysis: number;
  registeredVsExpected: {
    expected: number;
    registered: number;
    percentage: number;
  };
  budgetAnalysis: {
    totalBudget: number;
    spent: number;
    remaining: number;
  };
}

const Analytics = () => {
  const { eventId } = useParams();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(`/events/${eventId}/analytics`);
        setAnalytics(response.data);
      } catch (error: any) {
        console.error("Error fetching analytics data:", error.response.data);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchAnalyticsData();
    }
  }, [eventId]);

  const formatCurrency = (value: number | undefined) => {
    return (value || 0).toLocaleString();
  };

  const calculatePercentage = (
    part: number | undefined,
    whole: number | undefined
  ) => {
    if (!part || !whole) return 0;
    return (part / whole) * 100;
  };

  if (loading) {
    return (
      <Container>
        <LinearProgress />
      </Container>
    );
  }

  console.log(analytics);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Event Analytics Dashboard
      </Typography>

      {analytics && (
        <Grid container spacing={3}>
          {/* Event Info Card */}
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                  {analytics.eventInfo.title}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography color="textSecondary">Description</Typography>
                    <Typography variant="body1" paragraph>
                      {analytics.eventInfo.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography color="textSecondary">Date</Typography>
                        <Typography>
                          {new Date(analytics.eventInfo.date).toDateString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="textSecondary">Time</Typography>
                        <Typography>{analytics.eventInfo.time}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="textSecondary">Location</Typography>
                        <Typography>{analytics.eventInfo.location}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="textSecondary">
                          Created On
                        </Typography>
                        <Typography>
                          {new Date(
                            analytics.eventInfo.createdOn
                          ).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Participants Card */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PeopleAltIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6">Participants Overview</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography color="textSecondary">
                      Total Participants
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {analytics.participantsAnalysis}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography color="textSecondary">Registered</Typography>
                    <Typography variant="h4">
                      {analytics.registeredVsExpected.registered}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography color="textSecondary">Expected</Typography>
                    <Typography variant="h4">
                      {analytics.registeredVsExpected.expected}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <LinearProgress
                      variant="determinate"
                      value={analytics.registeredVsExpected.percentage}
                      sx={{ height: 10, borderRadius: 5, mt: 2 }}
                    />
                    <Typography align="center" sx={{ mt: 1 }}>
                      {analytics.registeredVsExpected.percentage}% Registration
                      Rate
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Budget Card */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AccountBalanceWalletIcon
                    sx={{ mr: 1, color: "primary.main" }}
                  />
                  <Typography variant="h6">Budget Analysis</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography color="textSecondary">Total Budget</Typography>
                    <Typography variant="h6">
                      ${formatCurrency(analytics.budgetAnalysis?.totalBudget)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography color="textSecondary">Spent</Typography>
                    <Typography variant="h6" color="error">
                      ${formatCurrency(analytics.budgetAnalysis?.spent)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography color="textSecondary">Remaining</Typography>
                    <Typography variant="h6" color="success.main">
                      ${formatCurrency(analytics.budgetAnalysis?.remaining)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <LinearProgress
                      variant="determinate"
                      value={calculatePercentage(
                        analytics.budgetAnalysis?.spent,
                        analytics.budgetAnalysis?.totalBudget
                      )}
                      sx={{ height: 10, borderRadius: 5, mt: 2 }}
                      color="error"
                    />
                    <Typography align="center" sx={{ mt: 1 }}>
                      {calculatePercentage(
                        analytics.budgetAnalysis?.spent,
                        analytics.budgetAnalysis?.totalBudget
                      ).toFixed(1)}
                      % Budget Utilized
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Card */}
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: {
                  xs: "400px", // Height for mobile
                  md: "500px", // Height for desktop
                },
              }}
            >
              <Typography variant="h6" gutterBottom>
                Registration Statistics
              </Typography>
              <Box sx={{ position: "relative", height: "calc(100% - 40px)" }}>
                <Bar
                  data={{
                    labels: [
                      "Total Registrations",
                      "Expected",
                      "Budget Spent",
                      "Budget Remaining",
                    ],
                    datasets: [
                      {
                        label: "Event Statistics",
                        data: [
                          analytics.registeredVsExpected?.registered || 0,
                          analytics.registeredVsExpected?.expected || 0,
                          analytics.budgetAnalysis?.spent || 0,
                          analytics.budgetAnalysis?.remaining || 0,
                        ],
                        backgroundColor: [
                          "rgba(54, 162, 235, 0.8)",
                          "rgba(255, 206, 86, 0.8)",
                          "rgba(255, 99, 132, 0.8)",
                          "rgba(75, 192, 192, 0.8)",
                        ],
                        borderColor: [
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(255, 99, 132, 1)",
                          "rgba(75, 192, 192, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top" as const,
                      },
                      title: {
                        display: true,
                        text: "Event Analytics Overview",
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          borderDash: [2],
                          color: "rgba(0, 0, 0, 0.1)",
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Analytics;
