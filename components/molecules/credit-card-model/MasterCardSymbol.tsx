import React from "react";
import Svg, { G, Rect, Path } from "react-native-svg";

export function MasterCardSymbol() {
  return (
    <Svg viewBox="0 0 131.39 86.9" width={50} height={66}>
      <G opacity={0}>
        <Rect width="131.39" height="86.9" fill="#fff" />
      </G>
      <Rect x="48.37" y="15.14" width="34.66" height="56.61" fill="#ff5f00" />
      <Path
        fill="#eb001b"
        d="M51.94,43.45a35.94,35.94,0,0,1,13.75-28.3,36,36,0,1,0,0,56.61A35.94,35.94,0,0,1,51.94,43.45Z"
      />
      <Path
        fill="#f79e1b"
        d="M120.5,65.76V64.6H121v-.24h-1.19v.24h.47v1.16Zm2.31,0v-1.4h-.36l-.42,1-.42-1h-.36v1.4h.26V64.7l.39.91h.27l.39-.91v1.06Z"
      />
      <Path
        fill="#f79e1b"
        d="M123.94,43.45a36,36,0,0,1-58.25,28.3,36,36,0,0,0,0-56.61,36,36,0,0,1,58.25,28.3Z"
      />
    </Svg>
  );
}
