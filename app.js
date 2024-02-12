var webstore = new Vue({
    el: '#app',
    data: {
        sitename: "After School Lessons",
        lessons: lessons,
        showLesson: true,
        sortBy: '',
        sortOrder: '',
        searchQuery: '',
        order: {
            name: '',
            number: ''
        },
        cart: [],
        
    },
    methods: {
        addToCart(lesson) {
            this.cart.push( lesson.id);
        },
        canAddToCart: function(lesson) {
            return lesson.spaces > this.cartCount(lesson.id);
        },
        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        },
        getLessonDetails(lessonId) {
            return this.lessons.find((lesson) => lesson.id === lessonId);
          },
          removeFromCart(index) {
            const removedLesson = this.cart.splice(index, 1)[0];
            const lessonIndex = this.lessons.findIndex(
              (item) => item.id === removedLesson.id
            );
      
            if (lessonIndex !== -1) {
              this.lessons.splice(lessonIndex, 0, removedLesson);
            }
          },
        showCheckout() {
            this.showLesson = this.showLesson ? false : true;
        },
        submitForm() {
            alert('Order submitted!')
        },
    },
    computed: {
        cartItemCount: function() {
            return this.cart.length ;
        },
        canCheckOut(){
            return this.order.name !== "" && this.order.number !== "";
        },
        searchLessons() {
            const query = this.searchQuery.toLowerCase().trim();
            if (!query) {
              return this.lessons;
            } else {
              return this.lessons.filter(
                (lesson) =>
                  lesson.lesson.toLowerCase().includes(query) ||
                  lesson.location.toLowerCase().includes(query)
              );
            }
          },
        sortedProducts() {
          return  this.searchLessons.sort((a, b) => {
                let modifier = 1;
                if (this.sortOrder === "desc") {
                  modifier = -1;
                }
                if (a[this.sortBy] < b[this.sortBy]) return -1 * modifier;
                if (a[this.sortBy] > b[this.sortBy]) return 1 * modifier;
                return 0;
              });
        },
        
    }
});