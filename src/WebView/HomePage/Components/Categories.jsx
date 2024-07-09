import "./categorystyle.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import StoriesSection from "./StoriesSection";

export default function Categories(props) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  useEffect(()=>{
    if(props.showBookmarks==true)
    setSelectedCategory("bookmarks")
    else 
    setSelectedCategory("all")
  }, [props.showBookmarks])
  useEffect(() => {
    (async () => setCategories(await getCategories()))();
  }, []);
  return (
    <div className="storypart">
      <div className="categories">
        {categories?.map((item, key) => {
          return (
            <div
              className={
                selectedCategory == item[0] ? "category selected" : "category"
              }
              key={key}
              onClick={() => setSelectedCategory(item[0])}
            >
              {<p>{item[0]?.toUpperCase()}</p>}
              {<img src={item[1]} />}
            </div>
          );
        })}
      </div>
      <StoriesSection selectedCategory={selectedCategory} categories={categories}/>
    </div>
  );
}

async function getCategories() {
  try {
    const response = await axios.get("https://storycreationbackend.onrender.com/story/all");
    let categories = response.data.map((i) => [i.category, i.imageURL]);
    categories = categories.filter(
      (currentArray, index, self) =>
        index ===
        self.findIndex((otherArray) => otherArray[0] === currentArray[0])
    );
    categories.unshift([
      "all",
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgWFhUZGRgaHB4eGhwcGhwcHBoaHBodHB4cHhwcIS4lHiErIRwcJjgmKy8xNTU1HiQ7QDszPy40NTEBDAwMEA8QHxISHzYsJSs0NDQ0NzQ0NDQ0NjY0NDQ0NDQ0NDY0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQACAwYBB//EADcQAAEDAgQEBQIGAgEFAQAAAAEAAhEhMQMEEkEFUWFxIoGRofCxwRMUMtHh8UJSBhUjYnKCkv/EABoBAAMBAQEBAAAAAAAAAAAAAAIDBAEFAAb/xAAoEQADAAICAgICAgIDAQAAAAAAAQIDERIhBDETQSJRMmFxsUKB0TP/2gAMAwEAAhEDEQA/APjUr2V5CgCJNniygXoXqakYQK4C8C9TZk8ehqsAqtK2YE1IBlQxehi1DFdrUegHRi1iu1iJw8CfurvZFgiXoCrAjhr1uCt9NVdsIWjHbBCyq0YxWxLq2E7UUKC3tbNMJsI/BfRXy7X6NEnQXB0baoLQY5xIRpy7IBEDb+YQO1vQqo5LaAXMmpshMRkmlkXmXia0QWLjgWg1WN7DxY9ewUZciUK8VCZ6NUmR+1KLMZKBaQbErytfZUsb9oyBin7KmK0XCNZhCKiwP0QuPHkjV7WhvF6AyvGvA2VnCLhVgHn9hVC2A0ZuKqvXBeFLpgkUXiiDZ7RmrBeALRrJSpRp6xsmFZzYK91AUHmVUKiV0YegKEKzArhqap2gWyjQt8MLxreiKw8sTZPWNpbF1SR4wIzCy9JVcLAIoQmODgkiFrklvIkDAbAUXjcEpk3K9FozAtRap0T1nQvGQJrCz/J3pXZdXlMqHASEvz+C1pgbIKf0JnynVcTmMfLwSV5l2QQmuLhg1mm/dDYTKoH0i1ZNz2MMPHhgGmsnvtH39VYMcTz85sdpUeyREAeVUTlmEOE9vI0KktOd0jcOVOlLF2ZYAZjpWetUAcjrknnzMmfJN882TIEgefkgX45dLJj5W3l7oJqn2jqJxrRthZJsFwBgCsXkmI9vLqs3ajRrSQP/AB5HsisjnHYTXiZDxDhNCAZmO8JtwHjGBhse17A4vb4Sdq3HolXVSm9bKMSTaRyj3w7YUqAIHvdBvg22/rZMuKaS4uFydp9IN+aTvfuU3DW1th5p4vRli1KwcYWr33+dFg41TXRHTPCZXsLwK4R455AFYUWsqJ3wngcBba5bEKkKxCRMGbKr1qhUavPpmmuE1Esw63WOE2YTHJ4MuHJUYuhGStIszLUlGYDAO6ZtyMgGhB23UbloNRCqVKkc6s6Zlg5fVsmuWynRXyWGCn+QyerZBT4nN8jyHIodkln+XDV1mPkNIqlOPgwbA91irZJPkNvTEwzBslHEHklPM7lqSL9EjxWOBM2+f0vNLR0PH4t8kKtDnb0W/wCDERKNy2Bq2P29UbxDBYGtI7HsAPeqW5LKzLalAmBiBbvxIMmm4S7DfBgjzCmYx4Bpsl1CZin8topnM60beKSLW6ese6Ay2PDp36/ssw8ufLjWffmZpt7rbM5NzDUEbg1qOYnZCscro6mNuUtmj3kmg+XVXMLCYvApAN4591GPNK17D5CZYOTLgHPa7SIHmSYFe3sUi0pLsffYpzBpWs1S/FIlOOJtbs3THIxUTzG1r/dJn4ckwYjmeQ7wkz+S6Kc1JIHx4FFRoXpE3UhURH7OfT2z0MWjOSoCiMESuhhhb6F09F/wuiiK/CcorPjF8/7E8rQHmsJV2FcWaHNFoW+Xy5JHOVkmWTNIRTKpirppGjcpSblb5ZkGtPsicvhtfb6haYzdLYjnNbqmIZJzbemMP+ohrQ1pmIrCph5kumTKUOxYImm/z090wyzZI6pkzoXWBa6G+QfVdXwvG01XJYWFAkGuw+dkxyeegVK9UqjkeZ49+zrs5m9QhKMzEFZ4ea1WVM0SaW7oJlLohnHbrdAT8QTQbV7+d15muDFpGqAHAGhBoex9lRuEazadj8hNIBABM037La69FLtxpSJMbLjDLtJpaQbyJ2PZC4mGHATy6fbyumzcoPETUDn+6HxD4YJpNN+1EGyiKb9HP4+BBWLWVm/SDZOMbBcRqAFCInmZggbgR9EN+TJGqa1JFoivOqymtHRxTdfQnxMhpeSBS7ZrQgEAmBMTFhN4ROExwGnW4VqASAZ2TnBwdVZilKchE+y8zOUaGyJJqYv/ADzU15VPTOrj8eqSYlYwN6jathMlEt4kzU4kB8VAMgEwYHhg0JJpFUO9pcN7HbrdLfypc6KENrSld+6mu5b/ACZ1MWKuKUrZfHeXu8LTJo0C5mgoTUmAPhS/EfI/reLURzcF+G9rxAIMguggwdwaHshHYWqSQBFYt6Te9kWJJvoXni100ARF1SJstdBJj56LUsa2DMmB0joqWt9EPoGiDVMcg2eyXvaauRGTx9Ko8S9Vpi8i3PQ7/L/+KiB/OdVF1OaJeFiGVdrlQBetC+Yl0joBDHorAxtM9qITDK8KrhPWxdSmOcDGDa2V357lJM+yVNdED55LdwMAxBP0oQfNUfI10jJwS32NGNL4dpg+3oUzyTdPUAEGvzn9UsyjyRBMD6kbJpw3D1YkGjXGp5+RvvRErbW2MrCp6QSx7i7oVsMBznANEn67I0v0HxGgoBQgAWjltZF4GIwjUKGfhle+V/onvx1Xsa8P4c6mnkK3JPPn5InP5QtADx25hF8Ez4aJoSIPqOanFuJ65kAE1hc15sny610evw8Sg5x0NdAqVXFIaRJMkT+x7LdzQ4mB2gR/SBzR8VSTyG2x+w9Oi6E1yOHfiyqC8A6yRpkOnY0FIt1hWxeHEPLYpXaYHavRLsPHLnAOeRMaQ0SDOxlwAHZOuE8VdhHwuod4r5gz90nJyX8SvBimegVnDtRnbmLCseawx+GtY3U4TNKXia/aF0xaHy5rAAYNDus87k5bpgisjlHpW31U3zNPTOvjxbWzisE6dTYr0B5fx9V7hCSSR5TFU9x8IMAj9V/t9vZLsy3UYBaJsDI35xRJzVyW0dHx54+xZmModQeCDf8ATNOYjnMhE8Ky2G4w4AAmHQKgAgyiMiwElr4BMwCR2HqvX4ekvbOnSTYUfS31ryK5mZt9P2dPD16Fv/K8PDDyMEeBsX3oJ7T0XKYjiZBBgGwuDNexv5pzxUENDpvIEwII29/ZI8d5kifkq3xdygPI1rRi8tAJjehIrPI9hyQOO76C/wBkfrcGHxRLqCexMcpJb6KsDGa7wgYjWudIjxhvidIP+QEmRyMjcXO/s4+SRZqVmuULN1HNRw6XoQ0az1UWOgr1O+WjOJmArNYTVesZPbmrPeLC31Uf0aVBXodVUlRt01V9Hg/KS0lwoQ0xItPhnvUkXsFphEkgHlHp8CzwGC5N/lUZlMtJkm1VTC12x+KHelKLZXBcX6WjxAwR1BquhyuE5lC2tp3np9PVV4Nmvy+M3Ea0OIrBte/09Fpn+M/ivL3EBznSQBAFeS11t9eiteM11XsJxMcQNVK05iBuVMbHLgLx7UF5S7OZsPADSJNTApPmvcjn4lro6E/ujidkuXHpjbhmaeyfEWtHUps7iLHgEkXO3mLLnBmNTooQa9PkJjlMCBcSdjPlXZFeOX2/ZDmVUtL0OMJ+kywzI+tDBnuFg4NaDqbJIgViKGT6KjCGVJ225myzOJqaee3Ole/9KZol+PfsHxGhogguPKojp17KuDnC06IvWZ2uAhcV5mKztCPyOUdqkzNzuAB/aY9StsPHK2dhwbxBmkcvIgfuujzHD26AQIPWqRcDY3DYXmskAdYufWi6PAzWoVhcPyKfLaOjHpHJ8ZyU/pE9R9Fy+ZyD2DW2XO1fp+oqfnkvpOZwWkmUtzHDw4/pnmYH9r05tT2VY60zicfLNAk6hMDm41iD2hZ5p7pANQIDSW3gDcdAPZdri8JYGueGbgwSeUUrX+UvzPBmvhxdAIrDYMcqR69FPVKtbL8eedvSPn3FsNngkOMHxhtPQkbgrlMxII3r/IX0Di+REy0EANjZ06RHMRY32XK8UwgHktGkEbCAL0uabVVeGp9I9njktoVubLQ7/HVUciRbnFFWjSXRIMzcCCCCKHqtsLDB1CZJiOU/VDuwz6deuyol99kNw0vRmWVgCpiBzk0UPaDYjn1WjGT4T68q7ckUMq2AdXtdFWVS9Hsfjuly/QHDfgUR35NvwO/dRD8z/Q34P8CNzpsqwqBWJWJrRzDxxXrSqqLOWmeCsHHihTjh+NBkmnJc6CisLG2KdOV0uJR42VYq5HRY2MHQRX69uiDxsQGY/hBDGhUOOSqsb17Kc3lc+/sK/Hryj9ltg4hNeaxyuFJBNufP+f2WwwocQ0yQYpQHrCfD7JattbY0yr4cKgT0TnL5x02qN+lre65pmPF708k4yGKXClxPnSf58l7JTEKUx1hOLhW/y4VvwSDX1FJ9ZHsteGlj7+F3I2JCZOYx0NhzdyTXYwI+XUbyaZrxoWYGSJcDf3TnLZWtBtWUdkuGsIoT1Mft9k6yPCKwf08xupcnlIH4FJ7hZfUxoESNtiIA2TDKYBud/pZE4WUDVs5w5/yoLycukMS0JuJO0ySLe6zwM6HFpBMO9esrXibtbYAmsEHkT+30QHDMqWnU82JIpzIm/OFnXHsfK2g/MYp1AERKCzwaBUAGv7IjMP1OJbaD5c0nzmCXTqdaSLmv7KW2kVYZ20KuMYTdJ5yJiD4aj6lcBnsJ51F1ATt0qOla0Xd5guNYt5zIhKsUhzSyB50M+fmtx5nP1s7EYU139HGMyhAkeKQbVikITNsLYFL+h8l2+T4QZgUre4gwaob/AJj/AMYfgtD9TXBwEAQNJ7dldHlp3pnN8jHx9HGauYihjyE2WTcyXGhgAUikc6+yvmcMkHVLQCASRMk7UiaCUE7wmAZHMWnp06qvjv0Q1npPX1/sIg/7FRYfmDyHp/Ki3gzPmQCoCoQolEhJXsLwIljKTfojlbPFMHCmpsrubWgWrRPZePZyqqowpIDl2XwMLcyQtm4ZqYEGRWdwRI6iZ7ws8qwzUUtfeiMc7VpbAIAOmJmSZINdzuR9030hstaL4YLA0uMT12Fo53PuqYhrT4DVG4vDy7D1l7Q4uLQwUOkCdRE263JlC4uXcwAkUtzqPqixV+32MaXv6PGEQ6akNpvBLgK+SM4VmHMMg2BHMEEaSPQoQ4MUMh3IiOW3b7LfKP0kiIJuE5LYqqU9se5fODcHmI2PchHs4zpMUNev3Sd+prdQBDRvUVWWHmg6C6nM3mOiny40lto3DknI+mdhlf8AkzmEaXOO5AJoI9113Dv+VNLdTjYVmp5XHcL4rmsSswRPLZXy2ceSGzLd639VJfizXZU1y6PtmZ/5Sx06XaYp67qcP4410OLxczUV9V8xZmgGgl4b51P7/wAovBzbYGgw7qZ1eloH1S14s8Q1EpaZ9SxeIt/xHeeXosMXONiRU/5LjP8Aq7/w/E68TFZisT137Ig4sAOJJBAJ0kEVmLWI3F7qasK0Nx4U02dNiYwtb+UK/F2MR8CVjOciCYGkVnzi6q/OmoLRzqahc7Lhe+h8yl0e5lpdLQKxeJJ5+657PYbg6C63+IuTvy6JseKxPiIpR0j0SHPNJdrvEXIt2umYcbXsb8znpFcTipbAhx6T7ki/NKuK8cLxLnFxrAMw3svc6+Z0g2v1mt/lVz+K0C7gSeVfpuuhiwx7a7I8uSu+zPMYuvsJPrEz7D0S/EEURWNjuAAA0g3MVdHXp0QT3SVXM/RBkrZNR/2Pqoq6VFvChRoxoJANBziYWb8MTQyOcQmOayhaY33Q34dO/wBl7Lh4NbGqeS9GGK0CA2o5xcr1gpv9vRavafJaNZY0Pe1B7o8WJLsXS7LMwYu4DlBk35bUrX7ojByvhk/KwOx/haMyRIDtQoBO1Npt9Ubg4YFK1oabzTuFTx4+gZjfs8y+WLmhu1T9jMVBMBeuwSJpEAydrWFPJF4h0FuppBIBEiw5iabK+Jhg6fxDAeJBiSAd43IAtdK22/6K3474bQuwHmZPiETIvT33W2MWmsEkCK2WOZyzWOdoxNYBoYILv/lXwGk+EA9ZFjbZNcL2iJZePTBn5ol41VAAEFtgAABWbAD0R+cexzgWNa0CKBxMnc/ai0ORg+AyLcrgwYnkmXE+Aty7cJ7cVry9skC7TyPVFNJaQut5O0LMbPvOGGSSxpJA2BMTbyS9njO9bLfMA6tJsaEdPJZYWG4VaPCQeZsNv3TGlvTG4cPFbSCTiy0AyYEVn72ufVXZlbFg5+t1bTpgPBa8+IAgadBaC003vPbvHpzM6ob2AmO4kk7blTZZaX4luG+NdnmIwRL6kntHWnmtss5rfCQOc1kWgT/G6jGF8m8DvFp7V9l5+ENXisY3MfKJE00mqG58ktrivY2wczI3IoQDao3LSjstqo0uiNq3jfqk+E8EnRHzkj8s+DMidgPrCnyPo9LfrY8y2Kxn6nDoajlQczX2QvGeKhxFABpAoBsSK2rS5QDRrHiivL6mLC6EzGEHOgHVHlAFTI9T5KNQnW2N5aAc1mnPeSZAmekc4RdSJZNKQTM/tuVi9jXN1bNEE7EgSB3/AHWOC46YsbgdCCFTMpr9CKp7L5nB0NOot1G41AuA6gb9CkOYY2ZBDhIvNgd7GD33RGbe4zM86i237Jbi45m9eydOPX2IvJv6Bs5iFznOO5MCwEmYA2HRCFbYsk7mViQj/oQ2TUopHRRb2YN808uOqyzwWyTI+BQuLoANOVgicNjNLpLg6mnSJbtR1jXmJ7ciz266ZfinjpmRFZaa9OiqMEzJ84sppLac7dijsswE6XGGkGTO8dj2/a6Z4/fTYVwmm2v+jXh2E1xID3axWA2aCpgki32XR/8AHsl/3gXta9mlwDXT/kTpMbEVNKSlXDcqzL42sjXoktDoINPCTHOhR+W4k6WPaXTQOmSIBEeXTp6+8tXP/wA3tFHg44zJ8paa9fpnRZjgL2AF8aXfpbqkClWxW9eWyQcWyjA1rnGCylD4XA1BANZFV0uZ4rqaxhc0vkiQaNtU38MkVSnjh1t/DddriBpAdRsilN4Hp0MQYMuXa5+yt4tS+SOPzDQXAtqKQAIvNLmE5wcV2K8vxS55cDJkB0wADMGYj0SvLZZxcSbCsWJA3nsE+wWAAgsOna5rEzO/8rrdJL7PnfLwNNtdHrcs0EaSbV1bkE2jpHoVvmck5wIbNBvyNTZRjnEXiNyYieVe9lb/AKg6uqXQ0QdwKVMb90HFrvYvH19AmW4OHaaNNhJ2JpXpuiMpwrQ9xeIFoLvEe0TXqvBjUB0wO14vf5VZ57ihnQwBrYiWzJmTV26F1TZXNykZ8ZLNDQwguDiCInSBFZN5t5HokrXamxX9N78qmKgJplmNe4iQDBpAg0JIBO9KeawGRDT4nuYDaGhwM7jxAbfRFyWtMlvNpmLMJzALEEC1aTHcGk9iEazK6xRwm1dxePWUK7NNDQBIcOgrW/urYWNG1J85pW0dPJJuW+0D8qT2aNyj2bC8CvnUX2WOYI1Q4e553kU5+q0zOdAMEE9TIFem9CsGMc+IEDt1vCQ5e+yiMypJh/Dc0S6tBEACwqLwLQs87my7wMbDalxB/VMRJiwAnzRLcqGQHXHidJqZ29K+axYRJBiTc2qax/7H7qfiuW0ih3udFH4P/aYwGP1vPnAr/wDLR5ylPE8eNGk1aAJ3pJ+/pCa5vEJFopHkAVzWK8uv/Soidk7rTI/HJrFf4QmNiVtHMfyvXYtPsg3uJKLieqjd7ia89/ssWsk/VbtJDQDMC4t3jqsMTEpAsjnpdim9muhvT55qIbUot5T+zw10EbAfKq2M4E0bE9bN5RHKBKtjvc6rja1N+68wMOb7GvmbLM8zL0zpY1T60eggNA323p/c+qZYLiGia2mmwOxihQuFhBzw0ktmgdy5UGxsqNzDpmhpB32jfepUun9Muipnaa/oZ4WKXOnoIHSOaJa8NI2BuPSPnRK8J4gXmpNgLGBW+3uvRL3TIpFN1bjScezVlua/E6vhmFpfqLQQaGgABvSOyccRwNbtTZDjGof7HkP9u3Mrm+CEteGuedFRBNJ6FdPiYrMMyPGG7tIMQbz91Fkhqtoot7ffspl8gxrPG2ZgkkAVmp36+iq3guI9oLcVr4Jbp1AFsAQK9BbZMuEvZjy0Ocx0T4oggRIBNZVRwl7WuDcQuEf5ERNJI6GSKyUcZtPi3p/2c7PM5G1Xs57Ew6/hhrnVk7CQaEU7DzS/MZZ9S02pYVE0iV2mXDdLo0lwpQEQ4RaDzE+iW42Xe6XaGBzbyQ2dMqyMzb4pejj+QnC6OWxMWGkfpMjwuBM8yKQI61QzsLUZBiK3rE0qKbJvmMDWSXRQT70k/LILP4D2Atjw0M3FRQgi09OXRPU7/wAkvzOf5AoeG1nT/rzHvVa/mw609+Xn/CDx8AgtEGIFdgb0/bqmeFlNY8FSbnlXfldDUJexdZF7B3NZ/sQeZMA9nemyydiFpBDmxvpMz0PSiYZnh50STBpUAbWrO+/YJC7JnUASG1/U4u0156QT18ktSn3s2M0119huGxryACdRjaRzpBmU5yzWsOgNl0GS7aL+l4SoObhtDGEvfFXAUnpNTFtkVk/BhuLjLnCGjcTGsu5CKDmSlud+/Rt5HPc+w/ALHl2oXBr153v8hA8Xc0vLmtAJigoLbDYUC1aRpnefLrKFzGGXGa85HLf6eyFYfy39BT5X4JP2BZjMuAI3B5VneRv53Sz8MuMNvBNSAIAJ3PRM/wApq8WplZEucG1a0GxruNokoTMAssQJ/wBY6G48qJvBL0FOdv2JczgkGpBmtCDeeViscMDrO3fqjsyxunVImTLazUTPbzS8u9ELkOadIu9xgyUK5aOcsygydrSGIqooop9BHQvg2oD7q2GHEhtIJ5jfnPyiXDEEAT/ErZhcCHNJm/8AK3NytHVw5dP/AMD8VlTNRJEjbz3B+6g0taaTPUDqDE9V4GyCTeJHlE0CGzOA4HVEg1BBkEETfnWo5pKfFJMe6bbcrZX8czEkR82W7MSBNJO8V8ot/KwwmyRMCbc5+Qo9sRJpFp+fAjWRN8QVyS5DbLY7nS7VbnXUSRMz0qneUzJa2TArp8UzYmjd6jTM3NufK5TGa0+IE/cfPot25wtJAJrz+dlZra0NnKmts6pmfAAII+hANPtKcN405uG4OdqOmf1RSg8zX3XD5XHY504uKGN2OgvP/wCQanzWWb4i0N0g6hYESNTRa9b1iLoXhmmkxebLDno63A4n+DGnTNCQamOYrRNsLirXYY8DQ4RSSdUkxIO9Svnr+JB2IHuAYXwXx+kOMgkATAsY77QEWc+9jhUERW4BBruOUc67ouDT0vf+zl55VS2de5rH6i1zRNmEEUIqe9THkgczk3taDLuQPIDYHb5zWXCAXVaKSBczFq7fCu3PDGnCY58mATfzAM3rPsjefhWqRxc/jtzyl9nzvOYeqBU/LrLItLX6ZIJ5iKxa9tpMXXUcRwWfqaABP6QBMjttuhcg/DY5+vD1amw0moY6ZpFQ4VTXlbl6RJja48aZgzED2gv/AMTWORmkHekrJ+Ewtk2rBESY72TfHyLGYYc15e59TDfCADAHiEk9PtEr8xhsaGmhMkOFYFvECefbZKi1sN4XST3rXYnxMtqsIpFa8+iuzKm4EfQRyM12R2YeNM0mNuUx86HqhRmQL3Fht1+d0f5V0hiriv2ZvxA0V52IvB5jZbcPyzsaWYUFx/SLEnzv/SHzLw4Ex3VclmzhuDsN+lzbQYI6z5/wvVLS/sZOn9AOdyr2PLXtLNLoIjcX3+6VZjEcCYJtHLyTvP5h2K4ucamrjzO56pLmsQVE/wAolvXYyUt6Qox3ncoeUTmHAoVTZU1RZPo0AUIUBUlHpaCM1FdRB8X9ni+ETMc9v7TnIZVz3NZqYwk/qeQxopYuNB50SXBeA4E7EekrYPLXETNfXke0VQS5T7H474h+YxC2AHVGqTNC0wIgefdV/OHSYDSBcEWkxI57XQjqitFlhuANRIO1ajuEvJM19DfnqX09BWXxHFzXAmZoTYGaRN6rVmLU7t6zFNqfKoE4kHV3AgW5UPIKgeTFf5j62S+P0ZOdobfitIiK7EfZVxB/kJDZMCk9AgGPlaY7jzv1VUt9Ia8yctsIJcf7HyV40ia9vbpdCseSjcB4An55Jqf9AKlX2WyWGS7TaTFdq1NbJth4Pi1OGzSBII2gUN4PlYoBuKy8dfPb3TbL4gGkhuqYMXERaRESt229hKVx0dRwd/4QDPDYOEVkPbqg87rqWcRlsGTMUmB7diuH4DiBuIx73eBupzm1r4SNMCxJp792TOLxqfpgVo0CAY8Mg7Tve6Vlxc6J6hdrQwzDGPdGqDU9LnabLx+HhtcBOk05Qevt7rnMTPT4z0rNY+BJ8XiLjAkxuSflP5TYx1vWzm5PGmW2l7O5zOKC0TUdxNhWlqhLMfMsDTAJdIjfmfSY9kny/ERH6p7lGHEDqF0iKR7Ilh77E5JUz+IZj8Pe9mpjC5ukGQJ06amY5QkTMoZdqFtzSxI3XT5RzmeGoBESOZ5+pRGLlAf8Wwf1UvFqiwoLXWK3D0eWJ8d6OOfh6AYrIMkID8Mk1FNl0uZyYaDSn1SXM4YAp/SplKuwJb/5IT5nPvbQUFR32S/EBcJNUZn2GeqBJMR91l9dFmPjroF0yvC1auaqgSpnPJj9lNK8IWjmqfhyj4NmbM5Ki1/AKi98dfo9tAyuTI7f1CyUJXOdBl9auHdvaUPK9Wctmp6LuUaJVQtmvERC1dmMs06d6/RVc8lUJXjkzk0Zs3YabyicB3NBtetG4v8ASdNIZNDJgBBqm3C8RrSNQmOvOPkJBhYlaBMsrG9AqFPJFuOlro6Jz2kAgR1VMfNkb03t9fv1SgPIrt3RD3h48UiK/ZMUaBr8irsZr7TdDNwhUk3/AKRWWysEmZm3w/KKmPlncq36eiapSIsktmOWYQCbiYAqN09yuYEA6PUpLhAtBJE9Nlu3iHKNX2WpHowTWto7vh76BxPWP75IzM5mRSAY9R0XOcJz5DfFE7gnpyWrs80uhxmLBR1jdWX5PGiY0umF5p7ngSBQEDsuRzgc02vZdYzNsiBySTPva6dPNVROlrRyM2DvZzeJhEmTQIF+AneLh7ITGZCy52S8nL0LDhDzWT2I5zQsn4Y3ogmHsdNNgjWc1bBw5Wjm6rWW+GzSq4xtdsN0kU/D6qLbUomaQPM59VKii+YZURe7KKLEePQrBRRHJjIFCoojfo8QbrVlvVeKIV7CXsLwU0wbeaii6WL+KKYCsX9JWOHcfN16onyH9jjKbfOSzx/3UUWz7YihbmLHshsn+o/N1FEX0Mx+0dJg7dj9lg39Tvm6iiXi9lXkewtm3/qsf8fL7FeqJz9s5+X0BYl/JA5iyiiXRysn8gRVzdgootn2hkmeCtD+pRRWfR6iKKKIQT//2Q==",
    ]);
    return categories;
  } catch (e) {
    console.log(e);
  }
}