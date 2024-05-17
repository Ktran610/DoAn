import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from "./components/Layouts";
import { publicRouter } from "./router";
import { Fragment } from "react/jsx-runtime";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {
                        publicRouter?.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if(route.layout) {
                                Layout = route.layout;
                            }else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            )
                        })
                    }
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
