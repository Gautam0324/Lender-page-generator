import { NextResponse } from "next/server";
import { isDbReady, getDbConfig, getDbError } from "@/lib/db";

export async function GET() {
  return NextResponse.json({
    ready: isDbReady(),
    database: getDbConfig().database,
    host: getDbConfig().host,
    error: getDbError(),
  });
}
