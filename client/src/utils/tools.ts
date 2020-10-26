type PointType = {
  x: number
  y: number
}

export function angle_bac(pointA: PointType, pointB: PointType, pointC: PointType) {
  const lengthAB = Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2)),
    lengthAC = Math.sqrt(Math.pow(pointA.x - pointC.x, 2) + Math.pow(pointA.y - pointC.y, 2)),
    lengthBC = Math.sqrt(Math.pow(pointB.x - pointC.x, 2) + Math.pow(pointB.y - pointC.y, 2))
  const cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) / (2 * lengthAB * lengthAC)
  const angleA = Math.round((Math.acos(cosA) * 180) / Math.PI)
  return angleA
}
