/**
 * Bottom tab navigator configuration for primary app sections.
 * Controls icon mapping and shared tab bar presentation.
 */
import { Tabs } from "expo-router";
import { CalendarDays, Home, Trophy, User } from "lucide-react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#ffffff",
                    borderTopWidth: 1,
                    borderTopColor: "#E5E7EB",
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: "#006400", // Turf Green
                tabBarInactiveTintColor: "#9CA3AF",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="bookings"
                options={{
                    title: "Bookings",
                    tabBarIcon: ({ color, size }) => <CalendarDays size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="tournaments"
                options={{
                    title: "Leagues",
                    tabBarIcon: ({ color, size }) => <Trophy size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
