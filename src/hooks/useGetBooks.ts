import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosInstance } from "axios";
import { Alert } from 'react-native';
import { capitalizeFirstLetter } from '../utils/helperFunctions';

const baseURL = "https://6953e4a9a319a928023d04d4.mockapi.io/books";

export interface Books {
  createdAt: string;
  name_of_author: string;
  bookCover: string;
  bookTitle: string;
  bookPrice: string;
  sellerEmail: string;
  id: string;
}



const instance = axios.create({
  baseURL: "https://6953e4a9a319a928023d04d4.mockapi.io",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})



const useGetBooks = () => {
  const fetchBooks = async (): Promise<Books[] | undefined> => {
    try {
      const result = await axios.get(baseURL);
      // const result = await instance.get("/books");
      // console.log(result)

      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
        // console.log(axiosError);
        throw new Error(axiosError.message);
    }
  };

  return useQuery<Books[] | undefined, AxiosError>({
    queryKey: ["books"],
    queryFn: fetchBooks,
    // retry: false,
    refetchOnMount: "always",
  });
};

export default useGetBooks;

// useMutation<TData, TError, TVariables, TContext>();

interface DeleteQuery{
    book: Books
}

export const useDeleteBooks = (query: DeleteQuery) => {
  const queryClient = useQueryClient();
  const deleteBook = async (): Promise<Books[] | undefined> => {
    try {
      const result = await axios.delete(`${baseURL}/${query.book.id}`);
      //   console.log(result)

      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      // console.log(axiosError);
      throw new Error(axiosError.message);
    }
  };
  return useMutation<unknown, Error, string, Books[] | undefined>({
    mutationFn: deleteBook,
    onSuccess: (_data, variable) => {
      // Alert.alert(`Deleting Book`, `Book has been deleted Successfully`);
      Alert.alert(
        `Deleting ${capitalizeFirstLetter(variable)}`,
        `${capitalizeFirstLetter(variable)} has been deleted Successfully`)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["books"] });
      // query.onCloseModal();
      const previousBooks = queryClient.getQueryData<Books[]>(["books"]);
      queryClient.setQueryData<Books[]>(["books"], (old) =>
        old?.filter((book) => book.id !== query.book.id)
      );

      return  previousBooks ;
    },

    onError: (error, variable, context) => {
      //the context is what onMutate returned
      
      queryClient.setQueryData<Books[]>(["books"], context);
      Alert.alert(
        `Deleting ${capitalizeFirstLetter(variable)}`,
        `${capitalizeFirstLetter(variable)} failed to delete because ${
          error.message
        }`
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

interface createBookVariable{
  newBook: Books;
  bookTitle: string;
  onCloseModal: () => void;
}

export const useAddBook = () => {
  const queryClient = useQueryClient();
  
  const createBook = async (newBook: Books): Promise<Books[] | undefined> => {
    const payload = {
      name_of_author: newBook.name_of_author,
      bookCover: newBook.bookCover,
      bookTitle: newBook.bookTitle,
      bookPrice: newBook.bookPrice,
      sellerEmail: newBook.sellerEmail,
    };
    try {
      const result = await axios.post(`${baseURL}`, payload);
      //   console.log(result)

      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      // console.log(axiosError);
      throw new Error(axiosError.message);
    }
  };
  return useMutation<
    unknown,
    Error,
    createBookVariable,
    { previousBooks: Books[] | undefined }
  >({
    mutationFn: async (variable) => createBook(variable.newBook),
    onSuccess: (_data, variable) => {
      Alert.alert(
        `Adding a Book`,
        `${variable.bookTitle} has been Added Successfully`
      );
      // query.onCloseModal()
      // queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onMutate: async (variable) => {
      await queryClient.cancelQueries({ queryKey: ["books"] });
      variable.onCloseModal();
      const previousBooks = queryClient.getQueryData<Books[]>(["books"]);
      queryClient.setQueryData<Books[]>(["books"], (old) => {
        if (!old) return [variable.newBook];
        return [variable.newBook, ...old];
      });

      return { previousBooks };
    },

    onError: (error, variable, context) => {
      //the context is what onmutate returned
      //variable is what we pass to the mutate function
      queryClient.setQueryData<Books[]>(["books"], context?.previousBooks);
      Alert.alert(
        `Adding ${capitalizeFirstLetter(variable.bookTitle)}`,
        `${capitalizeFirstLetter(variable.bookTitle)} failed to add because ${
          error.message
        }`
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};


export const useEditBook = () => {
  const queryClient = useQueryClient();
  
  const editBook = async (newBook: Books): Promise<Books[] | undefined> => {
    const payload = {
      name_of_author: newBook.name_of_author,
      bookCover: newBook.bookCover,
      bookTitle: newBook.bookTitle,
      bookPrice: newBook.bookPrice,
      sellerEmail: newBook.sellerEmail,
    };
    try {
      const result = await axios.patch(`${baseURL}`, payload);
      //   console.log(result)

      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      // console.log(axiosError);
      throw new Error(axiosError.message);
    }
  };
  return useMutation<
    unknown,
    Error,
    createBookVariable,
    { previousBooks: Books[] | undefined }
  >({
    mutationFn: async (variable) => editBook(variable.newBook),
    onSuccess: (_data, variable) => {
      Alert.alert(
        `Editing a Book`,
        `${variable.bookTitle} has been edited Successfully`
      );
      // query.onCloseModal()
      // queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onMutate: async (variable) => {
      await queryClient.cancelQueries({ queryKey: ["books"] });
      variable.onCloseModal();
      const previousBooks = queryClient.getQueryData<Books[]>(["books"]);
      queryClient.setQueryData<Books[]>(["books"], (old) => {
        if (!old) return [variable.newBook];
        const others = old?.filter((book)=> book.id !== variable.newBook.id)
        return [variable.newBook, ...others];
      });

      return { previousBooks };
    },

    onError: (error, variable, context) => {
      //the context is what onmutate returned
      //variable is what we pass to the mutate function
      queryClient.setQueryData<Books[]>(["books"], context?.previousBooks);
      Alert.alert(
        `Editing ${capitalizeFirstLetter(variable.bookTitle)}`,
        `${capitalizeFirstLetter(variable.bookTitle)} failed to edit because ${
          error.message
        }`
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};