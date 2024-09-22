import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { NativeModules } from 'react-native';
const { ProotModule } = NativeModules;


export const listDir = async (uri: string | null) =>{
	if (uri === null) return;
    return await FileSystem.readDirectoryAsync(uri);
}

export const writeFile = async ()=>{
};



export const buildDistro = async (type: string)=>{

    if (type === "arch") {
        await FileSystem.downloadAsync("https://raw.githubusercontent.com/EsziL/sinum/master/README.md", `${FileSystem.documentDirectory}/README.md`);
    }

    console.log(FileSystem.documentDirectory);
    console.log(await listDir(FileSystem.documentDirectory));
    console.log(await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}/README.md`));
    console.log("yello!!! you know this would be the part where i launch the distro and all but i kinda have to figure out how to do that first cuz im not sure yet");
};