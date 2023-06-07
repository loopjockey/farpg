export async function initDB(dbName, storeName) {
    let req = indexedDB.open(dbName);
    return new Promise((resolve, reject) => {
        req.onerror = reject;
        req.onupgradeneeded = e => e.target.result.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        req.onsuccess = e => resolve({ db: e.target.result, storeName });
    });
}

export async function op(dbInfo, operation, obj = {}) {
    let t = dbInfo.db.transaction(dbInfo.storeName, operation === "READ" || operation === "LIST" ? 'readonly' : 'readwrite');
    let s = t.objectStore(dbInfo.storeName);
    let r;

    switch (operation) {
        case "CREATE": r = s.add(obj); break;
        case "READ": r = s.get(obj.id); break;
        case "UPDATE": r = s.put(obj); break;
        case "DELETE": r = s.delete(obj.id); break;
        case "LIST": r = s.openCursor(); break;
        default: throw new Error("Invalid operation");
    }

    return new Promise((resolve, reject) => {
        let result;
        r.onerror = reject;
        r.onsuccess = (e) => {
            if (operation === "LIST") {
                if (!result) result = [];
                let cursor = e.target.result;
                if (cursor) {
                    result.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(result);
                }
            } else {
                resolve(r.result);
            }
        };
    });
};