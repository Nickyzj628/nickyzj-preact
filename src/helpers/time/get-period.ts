/** 获取当前时间段 */
export const getPeriod = () => {
  const hour = new Date().getHours();
  if (hour < 6) return "凌晨";
  if (hour >= 6 && hour <= 8) return "早上";
  if (hour >= 9 && hour <= 11) return "上午";
  if (hour === 12) return "中午";
  if (hour >= 13 && hour <= 17) return "下午";
  if (hour >= 18 && hour <= 19) return "傍晚";
  return "晚上";
};