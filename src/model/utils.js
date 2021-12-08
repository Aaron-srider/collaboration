import {Table} from "@/model/entity";

export function persist(tableName, defaultDataArr) {
  const table = localStorage.getItem(tableName)
  if (!table) {
    const table = new Table(defaultDataArr, tableName, undefined, 100)
    const str = JSON.stringify(table)
    localStorage.setItem(tableName, str)
  }
}
