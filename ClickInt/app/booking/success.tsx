/**
 * Booking confirmation screen.
 * Provides completion feedback and quick navigation options post-checkout.
 */
import { useRouter } from "expo-router";
import { CheckCircle } from "lucide-react-native";
import { Text, View } from "react-native";
import { Button } from "../../components/ui/Button";

export default function BookingSuccessScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white items-center justify-center p-6">
            <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-6">
                <CheckCircle size={48} color="#006400" />
            </View>

            <Text className="text-2xl font-extrabold text-gray-900 text-center mb-2">Booking Confirmed!</Text>
            <Text className="text-gray-500 text-center mb-8">
                Your slot has been reserved. You can manage players and start scoring from the My Bookings tab.
            </Text>

            <Button
                title="Go to Bookings"
                className="w-full mb-3"
                onPress={() => router.replace("/(tabs)/bookings")}
            />

            <Button
                title="Back Home"
                variant="secondary"
                className="w-full"
                onPress={() => router.replace("/(tabs)/home")}
            />
        </View>
    );
}
