package controllers

import "net/http"

/* The http.Request struct is large and complex — it contains fields like headers, URL, body, cookies
Passing a pointer is more efficient than copying the entire large http.Request struct for every single incoming request */
// The http.ResponseWriter is an interface that defines the methods needed to construct and send an HTTP response back to the client.
// This is a function signature we cannot make any changes
func PingHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("pong"))
}
