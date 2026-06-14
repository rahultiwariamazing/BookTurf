/**
 * Reusable input field with label, leading icon, and error display support.
 * Designed for form consistency in authentication and booking flows.
 */
import { clsx } from "clsx";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export function Input({ label, error, icon, className, ...props }: InputProps) {
    return (
        <View className="mb-4">
            {label && <Text className="text-gray-700 font-medium mb-1.5 ml-1">{label}</Text>}
            <View className="relative">
                <TextInput
                    className={clsx(
                        "bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 text-gray-900 text-base",
                        "focus:border-turf focus:bg-white",
                        error && "border-red-500 bg-red-50",
                        icon && "pl-11",
                        className
                    )}
                    placeholderTextColor="#9CA3AF"
                    {...props}
                />
                {icon && (
                    <View className="absolute left-4 top-3.5 z-10">
                        {icon}
                    </View>
                )}
            </View>
            {error && <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>}
        </View>
    );
}
