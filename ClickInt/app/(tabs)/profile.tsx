/**
 * Profile screen.
 * Offers access to account-adjacent screens and supports logout.
 */
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";

export default function ProfileScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
            <Text className="text-xl font-bold text-gray-900 mb-8">My Profile</Text>

            <View className="w-full mb-8">
                <TouchableOpacity
                    className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex-row items-center mb-3"
                    onPress={() => router.push("/content/rules")}
                >
                    <Text className="flex-1 font-bold text-gray-900">Rules & Regulations</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex-row items-center"
                    onPress={() => router.push("/(tabs)/bookings")}
                >
                    <Text className="flex-1 font-bold text-gray-900">My Bookings</Text>
                </TouchableOpacity>
            </View>

            <Button
                title="Logout"
                variant="danger"
                className="w-full"
                onPress={() => router.replace("/")}
            />
        </SafeAreaView>
    );
}
