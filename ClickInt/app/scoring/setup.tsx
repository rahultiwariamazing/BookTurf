/**
 * Pre-match configuration screen.
 * Captures overs and toss decisions before starting live scoring.
 */
import { clsx } from "clsx";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { useMatchStore } from "../../store/matchStore";

export default function MatchSetupScreen() {
    const router = useRouter();
    const { bookingId } = useLocalSearchParams();
    const initMatch = useMatchStore((state) => state.initMatch);

    const [overs, setOvers] = useState(6);
    const [tossWinner, setTossWinner] = useState<"team_a" | "team_b">("team_a");
    const [electedTo, setElectedTo] = useState<"bat" | "bowl">("bat");

    // Persists selected setup values to the match store and opens scorer UI.
    const handleStartMatch = () => {
        initMatch({
            bookingId,
            oversLimit: overs,
            tossWinner,
            electedTo
        });
        router.replace("/scoring/live");
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 py-4 border-b border-gray-100 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <ChevronLeft size={24} color="#111827" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Match Setup</Text>
            </View>

            <ScrollView className="flex-1 p-6">
                {/* Overs Selection */}
                <Text className="text-lg font-bold text-gray-900 mb-3">Overs per Innings</Text>
                <View className="flex-row gap-3 mb-8">
                    {[4, 6, 8, 10, 12].map((o) => (
                        <TouchableOpacity
                            key={o}
                            onPress={() => setOvers(o)}
                            className={clsx(
                                "w-12 h-12 rounded-full items-center justify-center border",
                                overs === o ? "bg-turf border-turf" : "bg-white border-gray-200"
                            )}
                        >
                            <Text className={clsx("font-bold text-lg", overs === o ? "text-white" : "text-gray-900")}>{o}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Toss Winner */}
                <Text className="text-lg font-bold text-gray-900 mb-3">Who won the toss?</Text>
                <View className="flex-row gap-4 mb-8">
                    <TouchableOpacity
                        onPress={() => setTossWinner("team_a")}
                        className={clsx("flex-1 p-4 rounded-xl border-2 items-center", tossWinner === "team_a" ? "border-turf bg-turf/5" : "border-gray-100 bg-white")}
                    >
                        <Text className="font-bold text-lg">Team A</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setTossWinner("team_b")}
                        className={clsx("flex-1 p-4 rounded-xl border-2 items-center", tossWinner === "team_b" ? "border-turf bg-turf/5" : "border-gray-100 bg-white")}
                    >
                        <Text className="font-bold text-lg">Team B</Text>
                    </TouchableOpacity>
                </View>

                {/* Toss Decision */}
                <Text className="text-lg font-bold text-gray-900 mb-3">Elected to?</Text>
                <View className="flex-row gap-4 mb-8">
                    <TouchableOpacity
                        onPress={() => setElectedTo("bat")}
                        className={clsx("flex-1 p-4 rounded-xl border-2 items-center", electedTo === "bat" ? "border-turf bg-turf/5" : "border-gray-100 bg-white")}
                    >
                        <Text className="font-bold text-lg">BAT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setElectedTo("bowl")}
                        className={clsx("flex-1 p-4 rounded-xl border-2 items-center", electedTo === "bowl" ? "border-turf bg-turf/5" : "border-gray-100 bg-white")}
                    >
                        <Text className="font-bold text-lg">BOWL</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View className="p-6 border-t border-gray-100">
                <Button
                    title="Start Live Scoring"
                    onPress={handleStartMatch}
                />
            </View>
        </SafeAreaView>
    );
}
