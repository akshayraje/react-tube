export const Settings = {
    "title": "React Tube",
    "description": "Simple video tube React web-app powered by Firebase",
    "toLocaleDateString": [
        "en-US",
        { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric'
        }
    ],
    "maxRelated": 4,
}

export var Root = 
    (typeof window === 'object' && window.window === window && window) ||
    (typeof global === 'object' && global.global === global && global) ||
    this

export default Settings