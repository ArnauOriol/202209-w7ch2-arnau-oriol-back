import type { RobotStructure } from "../database/models/robotTypes.js";

export const mockRobots: RobotStructure[] = [
  {
    stats: {
      speed: 1,
      strength: 10,
      createdAt: "2022-11-04T19:18:28.750Z",
    },
    robotId: "636563d18d7ffccdc807e73d",
    name: "machacatuercas",
    image: "https//robot.png",
  },
];

export const mockRobot: RobotStructure = {
  stats: {
    speed: 1,
    strength: 10,
    createdAt: "2022-11-04T19:18:28.750Z",
  },
  robotId: "636563d18d7ffccdc807e73d",
  name: "machacatuercas",
  image: "https//robot.png",
};
