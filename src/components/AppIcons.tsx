import React from "react";
import Svg, { G, Rect, Path, Circle, Text as SvgText, SvgProps } from "react-native-svg";

interface LogoProps extends SvgProps {
  width?: number;
  height?: number;
  showText?: boolean;
  textColor?: string;
  primaryColor?: string;
  bgColor?: string;
}

/**
 * Main Guardio Lens Logo Component
 * Can render full logo (with wordmark) or icon-only badge.
 */
export const MainLogo: React.FC<LogoProps> = ({
  width = 240,
  height = 140,
  showText = true,
  textColor = "#F3FBF8",
  primaryColor = "#0F6E56",
  bgColor = "#E1F5EE",
  ...props
}) => {
  if (!showText) {
    return (
      <Svg width={width} height={height} viewBox="0 0 240 240" {...props}>
        <Rect x="0" y="0" width="240" height="240" rx="52" fill={bgColor} stroke={primaryColor} strokeWidth="1" />
        <Path d="M120 40 L188 66 L188 130 C188 176 158 206 120 220 C82 206 52 176 52 130 L52 66 Z" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinejoin="round" />
        <Circle cx="120" cy="128" r="46" fill="#FFFFFF" />
        <Circle cx="120" cy="128" r="46" fill="none" stroke={primaryColor} strokeWidth="6" />
        <Circle cx="120" cy="128" r="28" fill="none" stroke={primaryColor} strokeWidth="6" />
        <Circle cx="120" cy="128" r="10" fill={primaryColor} />
        <Circle cx="138" cy="110" r="6" fill="#FFFFFF" opacity={0.9} />
      </Svg>
    );
  }

  return (
    <Svg width={width} height={height} viewBox="0 0 680 400" {...props}>
      <G transform="translate(140,80)">
        <Rect x="0" y="0" width="240" height="240" rx="52" fill={bgColor} stroke={primaryColor} strokeWidth="1" />
        <Path d="M120 40 L188 66 L188 130 C188 176 158 206 120 220 C82 206 52 176 52 130 L52 66 Z" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinejoin="round" />
        <Circle cx="120" cy="128" r="46" fill="#FFFFFF" />
        <Circle cx="120" cy="128" r="46" fill="none" stroke={primaryColor} strokeWidth="6" />
        <Circle cx="120" cy="128" r="28" fill="none" stroke={primaryColor} strokeWidth="6" />
        <Circle cx="120" cy="128" r="10" fill={primaryColor} />
        <Circle cx="138" cy="110" r="6" fill="#FFFFFF" opacity={0.9} />
      </G>

      <G transform="translate(420,150)">
        <SvgText x="0" y="30" fontSize="42" fontWeight="700" fill={textColor}>
          Guardio
        </SvgText>
        <SvgText x="0" y="78" fontSize="42" fontWeight="700" fill={textColor}>
          Lens
        </SvgText>
      </G>
    </Svg>
  );
};

/**
 * Shield Icon Component for Home & Security pages
 */
export const ShieldIcon: React.FC<SvgProps> = ({ width = 24, height = 24, color = "#5DCAA5", ...props }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Svg>
);

/**
 * Camera Lens Icon Component
 */
export const CameraLensIcon: React.FC<SvgProps> = ({ width = 24, height = 24, color = "#5DCAA5", ...props }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Circle cx="12" cy="12" r="10" />
    <Circle cx="12" cy="12" r="6" />
    <Circle cx="12" cy="12" r="2" />
  </Svg>
);

/**
 * Lock Icon for Auth pages
 */
export const LockIcon: React.FC<SvgProps> = ({ width = 24, height = 24, color = "#5DCAA5", ...props }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Svg>
);

/**
 * User Icon for Auth & Profile pages
 */
export const UserIcon: React.FC<SvgProps> = ({ width = 24, height = 24, color = "#5DCAA5", ...props }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx="12" cy="7" r="4" />
  </Svg>
);

/**
 * Organized SVGs grouped by Pages
 */
export const AppIcons = {
  // Global / App-wide SVGs
  Global: {
    MainLogo,
    ShieldIcon,
    CameraLensIcon,
  },
  // Auth Page SVGs (Login, Signup)
  Auth: {
    MainLogo,
    LockIcon,
    UserIcon,
  },
  // Home Page SVGs
  Home: {
    MainLogo,
    ShieldIcon,
    CameraLensIcon,
  },
};

export default AppIcons;
