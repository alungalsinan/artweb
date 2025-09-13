import { promises as fs } from "fs"
import path from "path"
import type { Programme } from "@/lib/schemas/programmes"

const DATA_DIR = process.env.FEST_DATA_DIR && process.env.FEST_DATA_DIR.trim().length > 0 ? process.env.FEST_DATA_DIR : path.join(process.cwd(), "data")
const PROGRAMMES_FILE = path.join(DATA_DIR, "programmes.json")

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true })
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data) as T
  } catch (e: any) {
    if (e?.code === "ENOENT") return fallback
    throw e
  }
}

async function writeJsonAtomic(filePath: string, data: unknown) {
  await ensureDir(path.dirname(filePath))
  const tmp = `${filePath}.tmp-${Date.now()}`
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8")
  await fs.rename(tmp, filePath)
}

export class ProgrammeStore {
  static async list(): Promise<Programme[]> {
    return readJson<Programme[]>(PROGRAMMES_FILE, [])
  }

  static async get(id: string): Promise<Programme | undefined> {
    const list = await this.list()
    return list.find((p) => p.id === id)
  }

  static async upsert(programme: Programme): Promise<Programme> {
    const list = await this.list()
    const idx = list.findIndex((p) => p.id === programme.id)
    if (idx >= 0) list[idx] = programme
    else list.push(programme)
    await writeJsonAtomic(PROGRAMMES_FILE, list)
    return programme
  }

  static async update(id: string, patch: Partial<Programme>): Promise<Programme | undefined> {
    const list = await this.list()
    const idx = list.findIndex((p) => p.id === id)
    if (idx < 0) return undefined
    const updated = { ...list[idx], ...patch }
    list[idx] = updated
    await writeJsonAtomic(PROGRAMMES_FILE, list)
    return updated
  }

  static async remove(id: string): Promise<boolean> {
    const list = await this.list()
    const filtered = list.filter((p) => p.id !== id)
    await writeJsonAtomic(PROGRAMMES_FILE, filtered)
    return filtered.length !== list.length
  }
}


