export class DateAndTime {

  static convertTo24(time: string): string {
    let hours = Number(time.match(/^(\d+)/)[1]);
    const minutes = Number(time.match(/:(\d+)/)[1]);
    const AMPM = time.match(/\s(.*)$/)[1];

    hours = AMPM === 'p. m.' && hours < 12 ? hours + 12 : hours;

    const sHours = hours < 10 ? '0' + hours.toString() : hours.toString();
    const sMinutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();

    return `${sHours}:${sMinutes}`;
  }

  static convertTo12(time: string): string {
    let hours = Number(time.match(/^(\d+)/)[1]);
    const minutes = Number(time.match(/:(\d+):/)[1]);
    const AMPM = hours > 11 ? 'pm' : 'am';
    hours = hours > 12 ? hours - 12 : hours;
    const sMinutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    return `${hours}:${sMinutes} ${AMPM}`;
  }
}
