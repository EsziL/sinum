import * as FileSystem from 'expo-file-system';

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
};