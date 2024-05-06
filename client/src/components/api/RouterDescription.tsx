import { useState } from "react"

type RouteDescription = {
    name: string,
    paths: {
        path: string,
        requests: {
            description: string,
            method: string,
            parameters: {
                name: string,
                description: string,
                type: string,
                required: boolean
            }[],
            returns: {
                code: number,
                exampleReturn: string,
                meanings: string,
                typescriptType: string
            }[]
        }[]
    }[]
}

export default function RouterDescription({
    description
}: {
    description: RouteDescription
}) {
    const [ selecteds, setSelecteds ] = useState<number[][]>(description.paths.map(path => path.requests.map((_, i) => i)));

    function changeSelection(pathIndex: number, requestIndex: number, returnIndex: number) {
        setSelecteds(prev => {
            const newSelecteds: typeof prev = prev.map(s => s.map(r => r));

            newSelecteds[pathIndex][requestIndex] = returnIndex

            return newSelecteds;
        });
    }

    return (
        <main>
            <h1>{description.name}</h1>
            {description.paths.map((path, pathIndex) =>
                <div>
                    <h2>{path.path}</h2>
                    {path.requests.map((req, reqIndex) =>
                        <div>
                            <h3>{req.method}</h3>
                            <p>{req.description}</p>
                            <h4>Parameters</h4>
                            <div>
                                {req.parameters.map(param =>
                                    <div>
                                        <h5>{param.name} ({param.type}) - {param.required ? "Required" : "Not required"}</h5>
                                        <p>{param.description}</p>
                                    </div>
                                )}
                            </div>
                            <h4>Returns</h4>
                            <div>
                                <nav>
                                    {req.returns.map((ret, i) =>
                                        <button key={i} onClick={() => changeSelection(pathIndex, reqIndex, i)} className="route_nav_button">
                                            {ret.code}
                                        </button>
                                    )}
                                </nav>
                                <div>
                                    <h5>Meanings</h5>
                                    <p>{req.returns[selecteds[pathIndex][reqIndex]].meanings}</p>
                                    <pre>{req.returns[selecteds[pathIndex][reqIndex]].exampleReturn}</pre>
                                    <h5>Typescript type</h5>
                                    <p>{req.returns[selecteds[pathIndex][reqIndex]].typescriptType}</p>
                                </div>
                            </div>
                        </div>    
                    )}
                </div>    
            )}
        </main>
    );
}