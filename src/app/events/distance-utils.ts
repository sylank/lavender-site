export default class DistanceUtils {
  public static WALK_DISTANCE = 5;
  public static BIKE_DISTANCE = 20;
  public static CAR_DISTANCE = 999;

  static isWalkDistance(distance: number) {
    if (distance > 0 && distance <= this.WALK_DISTANCE) {
      return true;
    }

    return false;
  }

  static isBikeDistance(distance: number) {
    if (distance > this.WALK_DISTANCE && distance <= this.BIKE_DISTANCE) {
      return true;
    }

    return false;
  }

  static isCarDistance(distance: number) {
    if (distance > this.BIKE_DISTANCE && distance <= this.CAR_DISTANCE) {
      return true;
    }

    return false;
  }
}
