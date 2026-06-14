/**
 * Placeholder screen for leagues and tournaments features.
 */
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TournamentsScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center">
            <Text className="text-xl font-bold text-gray-900">Leagues & Tournaments</Text>
            <Text className="text-gray-500 mt-2">Coming Soon</Text>
        </SafeAreaView>
    );
}
