import React from "react"
import { Route } from "react-router-dom"
import { AnalyzeForm } from "./Analyze/AnalyzeForm"
import { ItemProvider } from "./itemslists/ListProvider"
import { PurchasedList } from "./itemslists/purchasedlist"
import { ShoppingList } from "./itemslists/shoppinglist"
import { ItemDetail } from "./itemslists/ItemDetail.js"
import { MyProfile } from "./profile/profileform"
import { NoteForm } from "./itemslists/newnoteform"
import { UserProvider } from "./profile/UserProvider"
import { WelcomePage } from "./Welcome/WelcomePage"
import { EditNoteForm } from "./itemslists/editnoteform"
import { Resources } from "./resources/Resourcelist"
import { ResourceProvider } from "./resources/resourceprovider"
import { RandomTip } from "./resources/Randomtip";

export const ApplicationViews = () => {
    return (
        <>
            <ResourceProvider>
                <UserProvider>
                    <ItemProvider>
                        <Route path="/analyze">
                            <RandomTip />
                            <AnalyzeForm />
                        </Route>
                        <Route exact path="/">
                            <RandomTip />
                            <WelcomePage />
                        </Route>
                        <Route exact path="/shoppinglist">
                            <RandomTip />
                            <ShoppingList />
                        </Route>
                        <Route exact pacepath="/purchasedlist">
                            <RandomTip />
                            <PurchasedList />
                        </Route>
                        <Route path="/myprofile">
                            <RandomTip />
                            <MyProfile />
                        </Route>
                        <Route path="/resources">
                            <Resources />
                        </Route>
                        <Route path="/shoppinglist/:itemId(\d+)">
                            <RandomTip />
                            <ItemDetail />
                        </Route>
                        <Route path="/purchasedlist/:itemId(\d+)">
                            <RandomTip />
                            <ItemDetail />
                        </Route>
                        <Route path="/newnote/:ItemnoteId(\d+)">
                            <RandomTip />
                            <NoteForm />
                        </Route>
                        <Route path="/editnote/:editnoteId(\d+)">
                            <RandomTip />
                            <EditNoteForm />
                        </Route>
                    </ItemProvider>
                </UserProvider>
            </ResourceProvider>
        </>
    )
}


