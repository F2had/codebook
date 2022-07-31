import fs from "fs/promises";
import path from "path";
import express from "express";

interface Cells {
  id: string;
  content: string;
  type: "markdown" | "code";
}

export const createCellsRouter = (fileName: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const filePath = path.join(dir, fileName);

  router.get("/", async (req, res) => {
    try {
      const result = await fs.readFile(filePath, { encoding: "utf-8" });

      return res.send(JSON.parse(result));
    } catch (error: any) {
      console.error("error ", error);
      if (error.code === "ENOENT") {
        await fs.writeFile(filePath, "[]", { encoding: "utf8" });
        res.send([]);
      } else {
        console.error(error);
      }
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { cells }: { cells: Cells[] } = req.body;
      await fs.writeFile(filePath, JSON.stringify(cells), "utf8");
      return res.status(200).send({ message: "OK" });
    } catch (error) {
      throw error;
    }
  });
  return router;
};
