import { forwardRef, ReactNode, Ref } from "react";
import { Text } from "react-native";
import { Pressable, PressableProps } from "react-native-gesture-handler";
import { buttonActionStyle } from "./ButtonAction.styles";

interface Props extends PressableProps {
  children?: ReactNode
  label?: string
  contrast?: boolean
}

/**
 * @prop children ReactNode
 * @prop label string
 */
export const ButtonAction = forwardRef<Ref<typeof Pressable>, Props>((
  { children, contrast, label, style, ...props },
  ref: React.ForwardedRef<Ref<(props: PressableProps) => React.JSX.Element>>
) => {

  if (!children && !label) {
    throw new Error('You need to provide children or a label')
  }

  if (children && label) {
    throw new Error('You must provide OR children OR label')
  }

  return (
    <Pressable style={style} {...props} >
      {
        children
          ? children
          : <Text style={[buttonActionStyle.text, { color: contrast ? '#2c2c2c' : '#EDEDED' }]}>{label}</Text>
      }
    </Pressable>
  )
}
)
