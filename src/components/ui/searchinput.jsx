import * as React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const SearchInput = React.forwardRef(
  ({ className, type, onPlaceSelected, ...props }, ref) => {
    const inputRef = ref || React.useRef();

    React.useEffect(() => {
      if (
        type === "search" &&
        window.google &&
        window.google.maps &&
        window.google.maps.places
      ) {
        const autoComplete = new window.google.maps.places.Autocomplete(
          inputRef.current
        );

        autoComplete.addListener("place_changed", () => {
          const place = autoComplete.getPlace();
          if (place.geometry && place.geometry.location) {
            if (onPlaceSelected) {
              onPlaceSelected(place);
            }
          } else {
            alert("This location is not available");
          }
        });
      }
    }, [type]);

    return (
      <div className="relative flex items-center w-full">
        {type === "search" && (
          <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400" />
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-primary focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={inputRef}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
