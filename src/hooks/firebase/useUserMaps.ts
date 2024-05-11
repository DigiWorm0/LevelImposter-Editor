import { collection, getDocs, limit, orderBy, query, QueryConstraint, where } from 'firebase/firestore';
import React from 'react';
import LIMetadata from '../../types/li/LIMetadata';
import { db } from '../../utils/Firebase';

const MAX_PER_PAGE = 100;

export function useUserMaps(userID?: string) {
    const [mapList, setMapList] = React.useState<LIMetadata[]>([]);

    React.useEffect(() => {
        if (userID === undefined) {
            setMapList([]);
            return;
        }
        const mapQueries = [];
        mapQueries.push(
            where("authorID", "==", userID),
            orderBy("createdAt", "desc"),
            limit(MAX_PER_PAGE),
        );
        _getMaps(mapQueries).then(maps => {
            setMapList(maps);
        });
    }, [userID]);

    return mapList;
}

async function _getMaps(constraints: QueryConstraint[]) {
    const storeRef = collection(db, "maps");
    const mapsQuery = query(storeRef, ...constraints);
    const docs = await getDocs(mapsQuery);
    return docs.docs.map(doc => doc.data() as LIMetadata);
}