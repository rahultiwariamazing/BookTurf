/**
 * Reusable button component with variants, sizes, and loading state.
 * Keeps button behavior and visual language consistent across the app.
 */
import { clsx } from "clsx";
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: "primary" | "secondary" | "outline" | "danger";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    icon?: React.ReactNode;
}

export function Button({
    title,
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    className,
    disabled,
    ...props
}: ButtonProps) {

    const baseStyles = "flex-row items-center justify-center rounded-xl font-medium";

    const variants = {
        primary: "bg-turf text-white active:bg-turf-dark",
        secondary: "bg-gray-100 text-gray-900 active:bg-gray-200",
        outline: "border-2 border-turf bg-transparent text-turf active:bg-turf/10",
        danger: "bg-red-600 text-white active:bg-red-700",
    };

    const sizes = {
        sm: "px-4 py-2",
        md: "px-6 py-3",
        lg: "px-8 py-4",
    };

    const textStyles = {
        primary: "text-white font-bold text-base",
        secondary: "text-gray-900 font-bold text-base",
        outline: "text-turf font-bold text-base",
        danger: "text-white font-bold text-base",
    };

    return (
        <TouchableOpacity
            className={clsx(
                baseStyles,
                variants[variant],
                sizes[size],
                (disabled || loading) && "opacity-50",
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={variant === "outline" || variant === "secondary" ? "#006400" : "white"} />
            ) : (
                <>
                    {icon && <View className="mr-2">{icon}</View>}
                    <Text className={clsx(textStyles[variant])}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
}
