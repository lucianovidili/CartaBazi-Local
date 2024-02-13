//DONE -- Signo - - Afuera - - Pilar del Ano
//Fuciona para clientes nacidos entre el año 1901 y el 2043 inclusive.
func GetEnvoltura(fechaNac time.Time) string

//DONE - - Adentro - - Pilar del Dia
func GetTronco(fechaNac time.Time) string

//FALTA (algo hecho) - - Autoridad - - Pilar del Mes - - (El calculo es aproximado!. Se obtuvo del libro "Manual de astrologia china y feng shui" de Marcelo Viggiano)
func GetDefensa(fechaNac time.Time) string

//DONE - - Ascendente - - Pilar de la Hora
func GetPoder(fechaNac time.Time) string

(main.go) Local:
USAR:
server := &http.Server{ ... }
log.Fatal(server.ListenAndServe())
NO USAR (COMENTAR):
import "os"
import "google.golang.org/appengine"
import "github.com/gorilla/handlers"
http.Handle("/", handlers.CombinedLoggingHandler(os.Stderr, r))
appengine.Main()
URLs:
styles/style.css, scripts/script.js, etc. NO: /static/styles/style.css, /static/scripts/script.js

(main.go) Deployed:
USAR:
import "os"
import "google.golang.org/appengine"
import "github.com/gorilla/handlers"
http.Handle("/", handlers.CombinedLoggingHandler(os.Stderr, r))
appengine.Main()
NO USAR (COMENTAR):
server := &http.Server{ ... }
log.Fatal(server.ListenAndServe())
URLs:
/static/styles/style.css, /static/scripts/script.js, NO: styles/style.css, scripts/script.js, etc.

