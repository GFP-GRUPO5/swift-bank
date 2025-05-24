import { reduceStatements } from '@/redux/features/account/account-slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

export function Chart() {
  const { width } = Dimensions.get('window')
  const { accountChartData } = useAppSelector(state => state.account)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduceStatements())
  }, [])

  if (!accountChartData) {
    return (
      <ActivityIndicator size={'large'} />
    )
  }

  return (
    <PieChart
      paddingLeft='0'
      width={width - 32}
      height={220}
      chartConfig={chartConfig}
      accessor={"total"}
      backgroundColor={"transparent"}
      data={accountChartData.map(item => ({ ...item, value: Math.abs(item.total)}))}
    />
  )
}

const a = {
  name: "Toronto",
  population: 2800000,
  color: "#F00",
  legendFontColor: "#7F7F7F",
  legendFontSize: 15
}
