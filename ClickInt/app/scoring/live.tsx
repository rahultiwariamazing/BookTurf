/**
 * Live scoring interface.
 * Renders match scorecards and dispatches ball-by-ball scoring actions.
 */
import { clsx } from "clsx";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, MoreHorizontal, RotateCcw } from "lucide-react-native";
import { FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useMatchStore } from "../../store/matchStore";

export default function LiveScoringScreen() {
    const router = useRouter();
    const { battingTeam, score, currentOver, recordBall, strikerId, nonStrikerId, selectNewBatsman, team_a_players, team_b_players } = useMatchStore();

    const battingScore = score[battingTeam];
    const currentBatters = battingTeam === 'team_a' ? team_a_players : team_b_players;

    // Normalizes keypad events into store-compatible ball metadata.
    const handleScoreInput = (runs: number, type?: 'wide' | 'no_ball' | 'wicket') => {
        let extras = {};
        let wicket = null;

        if (type === 'wide') extras = { wide: true };
        if (type === 'no_ball') extras = { no_ball: true };
        if (type === 'wicket') {
            wicket = { isOut: true };
        }

        recordBall(runs, extras, wicket);
    };

    // If striker is null (Out), show selection
    const showNewBatsmanSelection = !strikerId && battingScore.wickets < 10;

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="light" />

            {/* 1. HEADER */}
            <View className="bg-turf pb-6 pt-12 px-6 rounded-b-3xl shadow-lg">
                <View className="flex-row justify-between items-start mb-6">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                    <Text className="text-white/80 font-bold uppercase tracking-widest text-xs">Match 1 • 1st Innings</Text>
                    <TouchableOpacity>
                        <MoreHorizontal color="white" size={24} />
                    </TouchableOpacity>
                </View>

                <View className="items-center">
                    <Text className="text-white text-6xl font-extrabold mb-1">
                        {battingScore.runs}<Text className="text-3xl text-white/60"> / {battingScore.wickets}</Text>
                    </Text>
                    <Text className="text-white/80 font-medium text-lg mb-4">
                        Over {battingScore.overs} <Text className="text-sm">(Run Rate: {battingScore.overs > 0 ? (battingScore.runs / battingScore.overs).toFixed(1) : "0.0"})</Text>
                    </Text>
                </View>
            </View>

            <ScrollView className="flex-1">
                {/* 2. THIS OVER */}
                <View className="mt-6 px-6">
                    <Text className="text-xs font-bold text-gray-500 uppercase mb-2">This Over</Text>
                    <View className="flex-row gap-2">
                        {currentOver.slice(-6).map((ball, i) => (
                            <View key={i} className={clsx(
                                "w-10 h-10 rounded-full border items-center justify-center shadow-sm",
                                ball.wicket ? "bg-red-100 border-red-200" : ball.runsBat === 4 || ball.runsBat === 6 ? "bg-green-100 border-green-200" : "bg-white border-gray-200"
                            )}>
                                <Text className={clsx(
                                    "font-bold",
                                    ball.wicket ? "text-red-800" : "text-gray-900"
                                )}>
                                    {ball.wicket ? 'W' : ball.extraType === 'wide' ? 'wd' : ball.runsBat}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* 3. BATSMAN & BOWLER */}
                <View className="mt-8 px-4 gap-4">
                    {/* Batsmen */}
                    <View className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex-row justify-between items-center">
                        <View>
                            <View className="flex-row items-center">
                                <Text className="font-bold text-lg text-gray-900 mr-2">
                                    {currentBatters.find(p => p.id === strikerId)?.name || "Select Batsman"} *
                                </Text>
                                <View className="bg-turf px-2 py-0.5 rounded"><Text className="text-white text-[10px] font-bold">STR</Text></View>
                            </View>
                        </View>
                        <View className="items-end">
                            <Text className="font-bold text-lg text-gray-900">
                                {currentBatters.find(p => p.id === nonStrikerId)?.name || "Non-Striker"}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* 4. SCORING KEYPAD */}
            <View className="bg-white border-t border-gray-100 px-4 py-6 shadow-2xl rounded-t-3xl">
                {/* Overlay logic if wicket fell */}

                <View className="flex-row gap-2 mb-3">
                    <ScoreBtn label="0" onPress={() => handleScoreInput(0)} />
                    <ScoreBtn label="1" onPress={() => handleScoreInput(1)} />
                    <ScoreBtn label="2" onPress={() => handleScoreInput(2)} />
                    <ScoreBtn label="4" variant="four" onPress={() => handleScoreInput(4)} />
                    <ScoreBtn label="6" variant="six" onPress={() => handleScoreInput(6)} />
                </View>

                <View className="flex-row gap-2">
                    <ScoreBtn label="WD" variant="extra" onPress={() => handleScoreInput(1, 'wide')} />
                    <ScoreBtn label="NB" variant="extra" onPress={() => handleScoreInput(1, 'no_ball')} />
                    <ScoreBtn label="OUT" variant="danger" onPress={() => handleScoreInput(0, 'wicket')} />
                    <TouchableOpacity className="aspect-square flex-1 items-center justify-center rounded-xl bg-gray-100 active:bg-gray-200">
                        <RotateCcw size={20} color="#374151" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* New Batsman Modal */}
            <Modal visible={showNewBatsmanSelection} animationType="slide" transparent>
                <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-white rounded-t-3xl p-6 h-2/3">
                        <Text className="text-xl font-bold text-gray-900 mb-4">Select Next Batsman</Text>
                        <FlatList
                            data={currentBatters.filter(p => p.id !== strikerId && p.id !== nonStrikerId && !p.isOut)}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="p-4 border-b border-gray-100"
                                    onPress={() => selectNewBatsman(item.id)}
                                >
                                    <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

function ScoreBtn({ label, variant = "default", onPress }: { label: string, variant?: "default" | "four" | "six" | "danger" | "extra", onPress: () => void }) {
    // Shared style map for scoring keypad variants.
    const styles = {
        default: "bg-white border border-gray-200 text-gray-900",
        four: "bg-blue-50 border border-blue-200 text-blue-700",
        six: "bg-purple-50 border border-purple-200 text-purple-700",
        danger: "bg-red-50 border border-red-200 text-red-700",
        extra: "bg-yellow-50 border border-yellow-200 text-yellow-700"
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            className={clsx("flex-1 aspect-square items-center justify-center rounded-xl shadow-sm active:scale-95", styles[variant])}
        >
            <Text className="font-extrabold text-lg">{label}</Text>
        </TouchableOpacity>
    )
}
