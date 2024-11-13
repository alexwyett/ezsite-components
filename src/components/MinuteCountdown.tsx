import useCountdown from "@bradgarropy/use-countdown";
import Plural from "./Plural";

export default function MinuteCountdown({ date, onComplete }: { date: Date, onComplete?: Function }) {
  const countdown = useCountdown({
    minutes: 0,
    seconds: (date.getTime() - Date.now()) / 1000,
    format: "mm:ss",
    autoStart: true,
    onCompleted: () => {
      onComplete?.();
    }
  })

  const [mins, seconds] = countdown.formatted.split(':');

  return (
    <>{Number(mins) > 0 && <>{mins}<Plural count={Number(mins)} plural='m' single='m' /></>} {seconds}<Plural count={Number(seconds)} plural='s' single='s' /></>
  )
}