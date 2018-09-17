package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type Post struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type Image struct {
	ID     int    `json:"id"`
	PostID int    `json:"post_id"`
	URL    string `json:"url"`
}

var posts []Post
var images []Image

func getPosts(w http.ResponseWriter, r *http.Request) {
	// TODO: Should also get related images and display same format as in server.py
	json.NewEncoder(w).Encode(posts)
}

// Near duplicate of getImage, may be able to make more generic
func getPost(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		json.NewEncoder(w).Encode("yeet")
	}

	for _, item := range posts {
		if item.ID == id {
			json.NewEncoder(w).Encode(item)
		}
	}
}

func getImages(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(images)
}

func getImage(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		json.NewEncoder(w).Encode("yeet")
	}

	for _, item := range images {
		if item.ID == id {
			json.NewEncoder(w).Encode(item)
		}
	}
}

func main() {
	router := mux.NewRouter()
	posts = append(posts, Post{ID: 1, Title: "Is this hard?", Description: "Tough questions here"})
	posts = append(posts, Post{ID: 2, Title: "React Challenge 2017!", Description: "Challenging answers there"})

	images = append(images,
		Image{
			ID:     1,
			PostID: 1,
			URL:    "https://www.tesla.com/sites/default/files/blog_images/model-s-photo-gallery-01.jpg",
		},
		Image{
			ID:     2,
			PostID: 1,
			URL:    "https://www.tesla.com/sites/default/files/blog_images/model-s-photo-gallery-02.jpg",
		},
		Image{
			ID:     3,
			PostID: 2,
			URL:    "https://www.tesla.com/sites/default/files/blog_images/model-s-photo-gallery-03.jpg",
		},
		Image{
			ID:     4,
			PostID: 2,
			URL:    "https://www.tesla.com/sites/default/files/blog_images/model-s-photo-gallery-04.jpg",
		},
		Image{
			ID:     5,
			PostID: 2,
			URL:    "https://www.tesla.com/sites/default/files/blog_images/model-s-photo-gallery-05.jpg",
		},
		Image{
			ID:     6,
			PostID: 2,
			URL:    "https://www.tesla.com/sites/default/files/blog_images/model-s-photo-gallery-06.jpg",
		},
	)

	router.HandleFunc("/posts", getPosts).Methods("GET")
	router.HandleFunc("/posts/{id:[0-9]+}", getPost).Methods("GET")
	router.HandleFunc("/images", getImages).Methods("GET")
	router.HandleFunc("/images/{id:[0-9]+}", getImage).Methods("GET")

	log.Fatal(http.ListenAndServe(":8005", router))
}
