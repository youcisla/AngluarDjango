export interface MyUser{
    id: number
    username: string
    password: string
    address: string
    email:string
    is_staff: Boolean
    token?:string
}