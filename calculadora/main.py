from amyd_resta import Resta
from amyd_suma import suma

def main():
    
    opcion = ""
    while opcion != "3":
        opcion = mostrar_menu()
        if opcion in ["1", "2"]:
            try:
                num1 = float(input("Ingrese el primer número: "))
                num2 = float(input("Ingrese el segundo número: "))
            except ValueError:
                print("Por favor, ingrese números válidos.")
                continue
            if opcion == "1":
                resultado = suma.sumar(num1, num2)
            elif opcion == "2":
                resultado = Resta.restar(num1, num2)
            elif opcion == "3":
                print("Saliendo de la calculadora.")
                break

            print(f"El resultado es: {resultado}")
        
        elif opcion == "3":
            print("Saliendo de la calculadora.")
            break
        else:
            print("Opción no válida, por favor intente de nuevo.")
            continue


def mostrar_menu():
    print("=== Calculadora ===")
    print("1 . Sumar")
    print("2 . Restar")
    print("3 . Salir")
    return input("Seleccione una opción: ")

if __name__ == "__main__":
    main()