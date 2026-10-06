import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native";
import { Div, P } from "@expo/html-elements";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Div className="gap-1.5 w-full">
      {label && (
        <P className="m-0 text-sm text-white/80 font-medium ml-1">{label}</P>
      )}
      <TextInput
        className={`bg-white/10 rounded-2xl px-5 py-4 text-white text-base border ${
          error
            ? "border-red-400/80 bg-red-500/10"
            : isFocused
            ? "border-white/50 bg-white/20"
            : "border-white/20"
        } ${className}`}
        placeholderTextColor="rgba(255,255,255,0.4)"
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
      {error && (
        <P className="m-0 text-red-300 text-xs mt-0.5 ml-1">{error}</P>
      )}
    </Div>
  );
}
