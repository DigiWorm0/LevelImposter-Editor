import React from "react";

export default function CheckMobile() {
    React.useEffect(() => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            alert("The LevelImposter Editor was not designed to run on a mobile device. Please use a desktop computer.");
        }
    })

    return (
        <div />
    );
}