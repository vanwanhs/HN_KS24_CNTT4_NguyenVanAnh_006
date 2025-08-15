var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Audience {
    constructor(name, email, phone) {
        this.id = Audience.nextId++;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    getDetails() {
        return `${this.id} - ${this.name} - ${this.email} - ${this.phone}`;
    }
}
Audience.nextId = 1;
class Movie {
    constructor(title, genre, ticketPrice, isShowing = true) {
        this.id = Movie.nextId++;
        this.title = title;
        this.genre = genre;
        this.ticketPrice = ticketPrice;
        this.isShowing = isShowing;
    }
    startShow() { this.isShowing = true; }
    stopShow() { this.isShowing = false; }
}
Movie.nextId = 1;
class ActionMovie extends Movie {
    calculateTicketCost(quantity) { return this.ticketPrice * quantity; }
    getSpecialOffers() { return ["Miễn phí bắp rang", "Tặng poster"]; }
    getMovieInfo() { return "Phim hành động gay cấn, kỹ xảo hoành tráng"; }
}
class ComedyMovie extends Movie {
    calculateTicketCost(quantity) {
        const base = this.ticketPrice * quantity;
        return quantity > 4 ? base * 0.9 : base;
    }
    getSpecialOffers() { return ["Giảm 10% cho nhóm trên 4 người"]; }
    getMovieInfo() { return "Phim hài nhẹ nhàng, vui nhộn"; }
}
class AnimationMovie extends Movie {
    calculateTicketCost(quantity) { return this.ticketPrice * quantity; }
    getSpecialOffers() { return ["Giảm giá cho trẻ em dưới 12 tuổi"]; }
    getMovieInfo() { return "Phim hoạt hình với hình ảnh sống động"; }
}
class TicketBooking {
    constructor(audience, movie, quantity) {
        this.bookingId = TicketBooking.nextId++;
        this.audience = audience;
        this.movie = movie;
        this.quantity = quantity;
        this.totalPrice = movie.calculateTicketCost(quantity);
    }
    getDetails() {
        return `Booking #${this.bookingId} | ${this.audience.name} | ${this.movie.title} x${this.quantity} = ${this.totalPrice.toLocaleString()} VND`;
    }
}
TicketBooking.nextId = 1;
function findById(collection, id) {
    return collection.find(item => item.id === id);
}
class Cinema {
    constructor() {
        this.movies = [];
        this.audiences = [];
        this.bookings = [];
    }
    addMovie(movie) { this.movies.push(movie); }
    addAudience(name, email, phone) {
        const a = new Audience(name, email, phone);
        this.audiences.push(a);
        return a;
    }
    bookTickets(audienceId, movieId, quantity) {
        const audience = findById(this.audiences, audienceId);
        const movie = findById(this.movies, movieId);
        if (!audience) {
            console.log("Không tìm thấy khán giả.");
            return null;
        }
        if (!movie) {
            console.log("Không tìm thấy phim.");
            return null;
        }
        if (!movie.isShowing) {
            console.log("Phim đã ngừng chiếu.");
            return null;
        }
        const booking = new TicketBooking(audience, movie, quantity);
        this.bookings.push(booking);
        return booking;
    }
    cancelMovie(movieId) {
        const movie = findById(this.movies, movieId);
        if (!movie) {
            console.log("Không tìm thấy phim.");
            return;
        }
        movie.stopShow();
        console.log(`Đã ngừng chiếu: ${movie.title}`);
    }
    listShowingMovies() {
        const showing = this.movies.filter(m => m.isShowing);
        if (showing.length === 0) {
            console.log("Không có phim đang chiếu.");
            return;
        }
        showing.forEach(m => console.log(`${m.id} - ${m.title} (${m.genre}) - ${m.ticketPrice.toLocaleString()} VND`));
    }
    listAudienceBookings(audienceId) {
        const list = this.bookings.filter(b => b.audience.id === audienceId);
        if (list.length === 0) {
            console.log("Khán giả chưa có đặt vé.");
            return;
        }
        list.forEach(b => console.log(b.getDetails()));
    }
    calculateTotalRevenue() {
        return this.bookings.reduce((sum, b) => sum + b.totalPrice, 0);
    }
    getMovieGenreCount() {
        return this.movies.reduce((acc, m) => {
            acc[m.genre] = (acc[m.genre] || 0) + 1;
            return acc;
        }, {});
    }
    getMovieSpecialOffers(movieId) {
        const movie = findById(this.movies, movieId);
        if (!movie) {
            console.log("Không tìm thấy phim.");
            return;
        }
        console.log(`Ưu đãi của "${movie.title}": ${movie.getSpecialOffers().join(" | ")}`);
    }
    findMovieById(id) { return findById(this.movies, id); }
    findAudienceById(id) { return findById(this.audiences, id); }
    findTicketBookingById(id) { return this.bookings.find(b => b.bookingId === id); }
}
function main() {
    const cinema = new Cinema();
    cinema.addAudience("Nguyễn Văn A", "a@gmail.com", "0123456789");
    cinema.addAudience("Trần Thị B", "b@gmail.com", "0987654321");
    cinema.addMovie(new ActionMovie("Fast & Furious", "Hành động", 80000));
    cinema.addMovie(new ComedyMovie("Mr Bean", "Hài", 60000));
    cinema.addMovie(new AnimationMovie("Frozen", "Hoạt hình", 70000));
    function inputNumber(prompt, min, max) {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const n = Number(s);
                if (!Number.isFinite(n)) {
                    console.log("Vui lòng nhập số hợp lệ.");
                    continue;
                }
                if (min !== undefined && n < min) {
                    console.log(`Số phải ≥ ${min}.`);
                    continue;
                }
                if (max !== undefined && n > max) {
                    console.log(`Số phải ≤ ${max}.`);
                    continue;
                }
                return n;
            }
        });
    }
    let running = true;
    while (running) {
        console.log("\n————— QUẢN LÝ ĐẶT VÉ RẠP CHIẾU —————");
        console.log("1. Thêm khán giả mới");
        console.log("2. Thêm phim mới");
        console.log("3. Đặt vé");
        console.log("4. Ngừng chiếu phim");
        console.log("5. Hiển thị phim đang chiếu");
        console.log("6. Hiển thị đặt vé của khán giả");
        console.log("7. Tính tổng doanh thu");
        console.log("8. Đếm số phim từng thể loại");
        console.log("9. Tìm kiếm theo mã định danh");
        console.log("10. Hiển thị ưu đãi của phim");
        console.log("11. Thoát");
        const choice = inputNumber("Chọn: ", 1, 11);
        switch (choice) {
            case 1: {
                const name = inputString("Tên: ");
                const email = inputString("Email: ");
                const phone = inputString("SĐT: ");
                const a = cinema.addAudience(name, email, phone);
                console.log("Đã thêm khán giả:", a.getDetails());
                break;
            }
            case 2: {
                console.log("1. ActionMovie");
                console.log("2. ComedyMovie");
                console.log("3. AnimationMovie");
                const t = inputNumber("Chọn loại: ", 1, 3);
                const title = inputString("Tên phim: ");
                const genre = inputString("Thể loại: ");
                const price = inputNumber("Giá vé: ", 0);
                let m;
                if (t === 1)
                    m = new ActionMovie(title, genre, price);
                else if (t === 2)
                    m = new ComedyMovie(title, genre, price);
                else
                    m = new AnimationMovie(title, genre, price);
                cinema.addMovie(m);
                console.log(`Đã thêm phim #${m.id}: ${m.title}`);
                break;
            }
            case 3: {
                cinema.audiences.forEach(a => console.log(a.getDetails()));
                const aid = inputNumber("ID khán giả: ", 1);
                cinema.movies.forEach(m => console.log(`${m.id} - ${m.title} (${m.genre}) - ${m.isShowing ? "Đang chiếu" : "Ngừng chiếu"}`));
                const mid = inputNumber("ID phim: ", 1);
                const qty = inputNumber("Số lượng vé: ", 1);
                const booking = cinema.bookTickets(aid, mid, qty);
                if (booking)
                    console.log("Đặt vé thành công:", booking.getDetails());
                break;
            }
            case 4: {
                const mid = inputNumber("ID phim: ", 1);
                cinema.cancelMovie(mid);
                break;
            }
            case 5: {
                cinema.listShowingMovies();
                break;
            }
            case 6: {
                const aid = inputNumber("ID khán giả: ", 1);
                cinema.listAudienceBookings(aid);
                break;
            }
            case 7: {
                const total = cinema.calculateTotalRevenue();
                console.log("Tổng doanh thu:", total.toLocaleString(), "VND");
                break;
            }
            case 8: {
                const counts = cinema.getMovieGenreCount();
                Object.entries(counts).forEach(([g, c]) => console.log(`- ${g}: ${c}`));
                break;
            }
            case 9: {
                console.log("1. Audience");
                console.log("2. Movie");
                console.log("3. TicketBooking");
                const t = inputNumber("Chọn: ", 1, 3);
                if (t === 1) {
                    const id = inputNumber("ID Audience: ", 1);
                    const a = cinema.findAudienceById(id);
                    console.log(a ? a.getDetails() : "Không tìm thấy.");
                }
                else if (t === 2) {
                    const id = inputNumber("ID Movie: ", 1);
                    const m = cinema.findMovieById(id);
                    if (m) {
                        console.log(`${m.id} - ${m.title} (${m.genre}) - ${m.ticketPrice.toLocaleString()} VND - ${m.isShowing ? "Đang chiếu" : "Ngừng chiếu"}`);
                        console.log("Mô tả:", m.getMovieInfo());
                    }
                    else
                        console.log("Không tìm thấy.");
                }
                else {
                    const id = inputNumber("ID Booking: ", 1);
                    const b = cinema.findTicketBookingById(id);
                    console.log(b ? b.getDetails() : "Không tìm thấy.");
                }
                break;
            }
            case 10: {
                const mid = inputNumber("ID Movie: ", 1);
                cinema.getMovieSpecialOffers(mid);
                break;
            }
            case 11:
                running = false;
                console.log("Kết thúc chương trình");
                break;
        }
    }
}
main();
