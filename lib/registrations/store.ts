import { promises as fs } from "fs"
import path from "path"
import type { Registration } from "@/lib/schemas/registrations"

const DATA_DIR = process.env.FEST_DATA_DIR && process.env.FEST_DATA_DIR.trim().length > 0 ? process.env.FEST_DATA_DIR : path.join(process.cwd(), "data")
const REG_FILE = path.join(DATA_DIR, "registrations.json")

async function ensureDir(dir: string) { await fs.mkdir(dir, { recursive: true }) }
async function readJson<T>(fp: string, fb: T): Promise<T> { try { const d = await fs.readFile(fp, "utf8"); return JSON.parse(d) } catch (e: any) { if (e?.code === "ENOENT") return fb; throw e } }
async function writeJsonAtomic(fp: string, data: unknown) { await ensureDir(path.dirname(fp)); const tmp = `${fp}.tmp-${Date.now()}`; await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8"); await fs.rename(tmp, fp) }

export class RegistrationStore {
  static async list(): Promise<Registration[]> { return readJson<Registration[]>(REG_FILE, []) }
  static async listByTeam(teamId: string): Promise<Registration[]> { const all = await this.list(); return all.filter(r => r.teamId === teamId) }
  static async create(reg: Registration): Promise<Registration> { const all = await this.list(); all.push(reg); await writeJsonAtomic(REG_FILE, all); return reg }
}


