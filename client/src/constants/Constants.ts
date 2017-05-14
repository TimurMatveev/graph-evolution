export const VIVA_GRAPH: any = (window as any).Viva.Graph;

export const API_URL: string = "api/v1";

export const MACHINE_STRUCTURE: Object = {
    _id: "",
    name: "",
    description: "",
    inintialGraph: {
        name: "",
        params: [],
    },
    instructions: {
        "Start": {
            variants: []
        }
    }
}