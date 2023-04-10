import { Button, Input, Text, Textarea, useToast } from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import validateEmail from '@utils/validateEmail';
import { FC, ReactElement, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const supabase = createClient(`${process.env.NEXT_PUBLIC_SUPABASE_URL}`, `${process.env.NEXT_PUBLIC_SUPABASE_KEY}`);

const ContactForm: FC = () => {
  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: 'all',
  });
  const { errors } = formState;
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (value): Promise<void> => {
    setLoading(true);
    const { error } = await supabase.from('contacts').insert([value]);

    if (error) {
      toast({
        title: 'Something went wrong. Please try again later.',
        status: 'error',
        position: 'bottom',
      });
      reset();
      return;
    }

    toast({
      title: 'Message sent successfully.',
      status: 'success',
      position: 'bottom',
    });
    reset();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="14px" color="#878e99">
        Name
      </Text>
      <Input
        placeholder="Name"
        size="sm"
        {...register('name', {
          required: true,
        })}
        border="1px solid gray"
      />
      {errors.name && (
        <Text fontSize="12px" mt="8px" color="red.400">
          Name is required
        </Text>
      )}

      <Text fontSize="14px" color="#878e99" mt="16px">
        Email
      </Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: true, validate: validateEmail }}
        render={({ field }): ReactElement => <Input placeholder="Email" size="sm" {...field} border="1px solid gray" />}
      />
      {errors.email?.type === 'required' && (
        <Text fontSize="12px" mt="8px" color="red.400">
          Email is required
        </Text>
      )}
      {errors.email?.type === 'validate' && (
        <Text fontSize="12px" mt="8px" color="red.400">
          Email is invalid
        </Text>
      )}

      <Text fontSize="14px" color="#878e99" mt="16px">
        Subject
      </Text>
      <Input
        placeholder="Subject"
        size="sm"
        {...register('subject', {
          required: true,
        })}
        border="1px solid gray"
      />
      {errors.subject && (
        <Text fontSize="12px" mt="8px" color="red.400">
          Subject is required
        </Text>
      )}

      <Text fontSize="14px" color="#878e99" mt="16px">
        Message
      </Text>
      <Textarea
        placeholder="Your Message"
        size="sm"
        mt="14px"
        {...register('message', {
          required: true,
        })}
        border="1px solid gray"
      />
      {errors.message && (
        <Text fontSize="12px" mt="8px" color="red.400">
          Message is required
        </Text>
      )}

      <Button
        mt="15px"
        borderRadius="none"
        colorScheme="blue"
        type="submit"
        isDisabled={Boolean(Object.keys(errors).length)}
        isLoading={loading}
      >
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
