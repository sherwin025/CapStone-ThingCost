import React from "react"
import { Route } from "react-router-dom"
import { AnalyzeForm } from "./Analyze/AnalyzeForm"
import { UserItemProvider } from "./Analyze/FormProvider"
import { ItemProvider } from "./itemslists/ListProvider"
import { PurchasedList } from "./itemslists/purchasedlist"
import { ShoppingList } from "./itemslists/shoppinglist"
import { ItemDetail } from "./itemslists/ItemDetail.js"
import {MyProfile } from "./profile/profileform"

export const ApplicationViews = () => {
    return (
        <>
            <UserItemProvider>
                <ItemProvider>
                    <Route path="/analyze">
                        <AnalyzeForm />
                    </Route>
                    <Route exact path="/shoppinglist">
                        <ShoppingList />
                    </Route>
                    <Route path="/purchasedlist">
                        <PurchasedList />
                    </Route>
                    <Route path="/myprofile">
                        <MyProfile />
                    </Route>
                    <Route path="/shoppinglist/:itemId(\d+)">
                        <ItemDetail />
                    </Route>
                </ItemProvider>
            </UserItemProvider>
        </>
    )
}


