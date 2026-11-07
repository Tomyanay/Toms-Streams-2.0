
export type Setting_Store={
    Setting_Options:Setting_Frame[],
    Set_Option:(Settingname:string,New_value:boolean)=>void,
}

export type Setting_Frame={
    SettingName:string
    Summery:string,
    isActive:boolean
}

