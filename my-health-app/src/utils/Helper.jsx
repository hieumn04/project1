


export const filterUsersByRole = (arr, role) => {
    if(!Array.isArray(arr) && !role) {
        return [];
    }

    const filteredUsers = arr.filter((user) => 
        user.roles && role && typeof user.roles === "string" && user.roles.toLowerCase().includes(role.toLowerCase())
    );

    return mergeLastLevelObject(filteredUsers, "psychologistInfo");
}

export const mergeLastLevelObject = (obj, nestedKey) => {
    if(!obj || !nestedKey) {
        return Array.isArray(obj) ? [] : {};
    }

    if(typeof obj !== 'object') {
        return obj.map((item) => {
            const nestedInfo = item[nestedKey] || {};
            return {
                ...item,
                ...nestedInfo,
            };
            
        });
    }

    const nestedInfo = obj[nestedKey] || {};
    return {
        ...obj,
        ...nestedInfo,
    }
}

export const filterDropdownItemsByRole = (items, role) => {
    if(!Array.isArray(items) && !role) {
        return [];
    }

    return items.filter((item) => {
        return item.roles &&
            Array.isArray(item.roles) &&
            item.roles.includes(role);
    });
}

export const filterMenuItemsByRole = (items, role) => {
    if(!Array.isArray(items)) {
        return [];
    }

    const effectiveRole = role || "public";

    return items.filter((item) => {
        item.roles && Array.isArray(item.roles) && item.roles.includes(effectiveRole)
    })
    .map((item) => ({
        key: item.key,
        label:(
            <Link to={item.key || ""} className="hover:text-primary-green">
                <span className="text-sm">{item.label || "Unknown"}</span>
            </Link>
        ),
        children: item.children ? filterMenuItemsByRole(item.children, role) : undefined,
        special: !!item.special,

    }));
}
