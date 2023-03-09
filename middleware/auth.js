export default function ({ store, redirect, route }) {
    if (!store.state.regis.isAuth) {
        if (route.name !== "login" && route.name !== "home" && route.name !== "regis")
            redirect("/login");
        
        redirect();
    } 
    else {
        if (route.name == "login" || route.name == "regis") 
            redirect("/users");
    
        redirect();
    }

    // if(!localStorage.getItem('isAuth') || localStorage.getItem('token') === null){ // blm login
    //     if(route.name == "usersData")
    //         redirect("/login");
    // }
    // else if(localStorage.getItem('isAuth') && localStorage.getItem('token')){ // logged in
    //     if(route.name == "login")
    //         redirect("/users");
    // }
    // else
    //     redirect();

    // if(route.name == 'login')
    //     redirect('/users');
    // else
    //     redirect();
}